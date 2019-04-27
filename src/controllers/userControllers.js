const User = require("../models/user.js");

//create and save a news user
exports.create = (req, res) => {
  //validate request

  // create user
  const user = new User(req.body);
  const initials = user.getInitials();
  user.initials = initials;
  //save user in the db
  user
    .save()
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || " some error occured while creating the user."
      });
    });
};

exports.findAll = (req, res) => {
  return User.find()
    .select({ password: false })
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      message: err.message || "some error occured while retrieving users.";
    });
};
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).send({
        message: "error retrieving user  with id " + req.params.userId
      });
    });
};
exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).send({
        message: "error updating user with id " + req.params.userId
      });
    });
};
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId
        });
      }
      return res.status(204).json({ message: "user deleted successfully" });
    })
    .catch(err => {
      return res.status(500).send({
        message: "could not delete user with id " + req.params.userId
      });
    });
};
