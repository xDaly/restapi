
const classeController = require('../controllers/classeController.js');

module.exports = (router) => {

    // Create a new classe
    router.post('/classes', classeController.create);

    // Retrieve all Users
    router.get('/classes', classeController.findAll);

    // Retrieve a single Note with classeId
    router.get('/classes/:classeId', classeController.findOne);

    // Update a Note with classeId
    router.put('/classes/:classeId', classeController.update);

    // Delete a Note with noteId
    router.delete('/classes/:classeId', classeController.delete);
}




