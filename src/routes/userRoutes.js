const userController = require("../controllers/userControllers.js");
//const { requireAuth } = require("../config/passport");
module.exports = router => {
  //create a new user
  router.post("/users", /*requireAuth,*/ userController.create);
  //retrieve all users
  router.get("/users", userController.findAll);
  //retrieve a single note with userid
  router.get("/users/:userId", userController.findOne);
  //update a note with userId
  router.put("/users/:userId", userController.update);
  //delete a note with useId
  router.delete("/users/:userId", userController.delete);
};
