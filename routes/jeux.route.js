const express = require("express")
,     router = express.Router()
,     editeurController = require('../controllers/editeur.controller')
,     machineController = require('../controllers/machine.controller');

 // router.get('/liste-des-jeux', indexController.getIndexPage);
 
// Machine
router.get('/liste-machine', machineController.getListeMachinePage);

// Editeur
router.get('/liste-Editeur', editeurController.getListeEditeurPage);

module.exports = router;