const express = require("express")
,     router = express.Router()
,     machineController = require('../controllers/machine.controller');

 // router.get('/liste-des-jeux', indexController.getIndexPage);
 
// Machine
router.get('/liste-machine', machineController.getListeMachinePage);

module.exports = router;