const Classe = require("../models/classe");

// Create and Save a new Classe
exports.create = async (req, res) => {
  try {
    let classe = new Classe(req.body);
    classe = await classe.save().then(newClasse => newClasse);

    return res.status(201).json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Retrieve and return all classes from the database.
exports.findAll = async (req, res) => {
  try {
    const classes = await Classe.find()
      .populate("students")
      .populate("tutors");

    return res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Find a single classe with a classeId
exports.findOne = async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.classeId);
    if (!classe) {
      return res.status(404).send({
        message: "Classe not found with id " + req.params.classeId
      });
    }
    return res.status(200).json(classe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a classe identified by the classeId in the request
exports.update = async (req, res) => {
  // Find classe and update it with the request body
  try {
    const classe = await Classe.findByIdAndUpdate(
      req.params.classeId,
      { $set: req.body },
      { new: true }
    );
    if (!classe) {
      return res.status(404).send({
        message: "Classe not found with id " + req.params.classeId
      });
    }
    return res.status(200).json(classe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a classe with the specified classeId in the request
exports.delete = async (req, res) => {
  try {
    const classe = await Classe.findByIdAndRemove(req.params.classeId);
    if (!classe) {
      return res.status(404).send({
        message: "Classe not found with id " + req.params.classeId
      });
    }
    return res.status(204).json({ message: "Classe deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
