const mongoose = require("mongoose");

const classeSchema = mongoose.Schema(
  {
    number: Number,
    title: String,
    tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    formations: [{ type: mongoose.Schema.Types.ObjectId, ref: "formation" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Classe", classeSchema);
