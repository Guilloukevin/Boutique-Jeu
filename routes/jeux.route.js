const express = require("express")
,     router = express.Router()
,     getJeuxController = require('../controllers/getJeux.controller')




 
// Jeux
router.get('/liste-jeux', getJeuxController.getListeJeuxPage);

// Modife Jeux

// Suppréssion Jeux


// Mise à jour Jeux



module.exports = router;