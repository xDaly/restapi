const jwt = require("jwt-simple");
const JWTSECRET = require("../config/env").JWTSECRET;

const tokenforUser = (user, exp) =>
  jwt.encode(
    {
      sub: user.id,
      exp: exp
    },
    JWTSECRET
  );
exports.signin = (req, res) => {
  res.send({
    token: tokenforUser(req.user, Math.round(Date.now() / 1000 + 120 * 60)),
    user: req.user
  });
};
exports.signOut = (req, res) => {
  res.status(200).send({ token: 0 });
};
