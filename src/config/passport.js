const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const { JWTSECRET } = require("./env");
exports.verifySignIn = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res
        .status(401)
        .json({ code: 147, error: "email cannot be empty" });
    }
    if (!req.body.password) {
      return res
        .status(401)
        .json({ code: 103, error: "password cannot be empty" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ code: 143, error: "wrong email" });
    }
    if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({ code: 144, error: "wrong password" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: JWTSECRET
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub).then(User => {
    if (User) {
      done(null, user);
    } else {
      done(null, false);
    }
    err => done(err, false);
  });
});
passport.use(jwtLogin);
exports.requireAuth = passport.authenticate("jwt", { session: false });
