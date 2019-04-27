const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    initials: { type: String, uppercase: true },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: value => {
        return validator.isEmail(value);
      }
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student", "tutor"],
      default: "student"
    },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);
//userSchema.index({ email: 1 }, { unique: true });
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};
userSchema.methods.getInitials = function() {
  return this.firstName[0] + this.lastName[0];
};

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

userSchema.pre("findOneAndUpdate", function(next) {
  const user = this._update.$set;
  if (user.password) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  }
});
module.exports = mongoose.model("user", userSchema);
