const { verifySignIn, requireAuth } = require("../config/passport");
const authcontroller = require("../controllers/authController");
module.exports = router => {
  router.post("/signin", verifySignIn, authcontroller.signin);
  router.get("/signout", requireAuth, authcontroller.signOut);
};
