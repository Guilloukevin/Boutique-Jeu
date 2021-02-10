const express = require("express")
,     router = express.Router()
,     jeuxController = require('../controllers/jeux.controller')
,     cookieParser = require('cookie-parser')
,     csrf = require('csurf');


// Configurer les routes du middleware
const csrfProtection = csrf({ cookie: true });
const parseForm = express.urlencoded({ extended: false });

// Jeux
router.get('/liste-jeux', jeuxController.getListeJeuxPage);
// Ajout Jeux
router.get('/ajouter-jeux',csrfProtection, jeuxController.getAjouterJeuxPage);
router.post('/ajouter-jeux', jeuxController.postAjouterJeuxPage);

// get un jeu par l'Id
router.get('/liste-jeux/:id', jeuxController.getListeJeuxPageId);

// Modifier un jeu
router.get('/modifier-jeux', jeuxController.getModifierJeuxPage);
router.put('/modifier-jeux', jeuxController.putModifierJeuxPage);

// Supprimer un jeux 
router.delete('/liste-jeux/:id', jeuxController.deleteSupprimerJeuxPageId);

module.exports = router; 