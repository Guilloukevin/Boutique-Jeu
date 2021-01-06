const express = require("express")
,     router = express.Router()
,     jeuxController = require('../controllers/jeux.controller')

// Jeux
router.get('/liste-jeux', jeuxController.getListeJeuxPage);

// Ajout Jeux
router.get('/ajouter-jeux', jeuxController.getAjouterJeuxPage);
router.post('/ajouter-jeux', jeuxController.postAjouterJeuxPage);

// Modifier un jeu
router.get('/modifier-jeux', jeuxController.getModifierJeuxPage);
router.put('/modifier-jeux', jeuxController.putModifierJeuxPage);


module.exports = router;