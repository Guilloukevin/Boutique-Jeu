const express = require("express")
,     router = express.Router()
,     authController = require('../controllers/auth.controller');

// Methode Get : formulaire pour ajouter un utilisateur
router.get('/register', authController.getRegisterPage);

// Methode Post :
router.post('/register', authController.postRegisterPage);

// Methode get : Formulaire pour la page login
router.get('/login', authController.getLoginPage);

// Methode post : Formulaire de connection
router.post('/login', authController.postLoginPage);

// Methode get : Se deconnecter
router.get('/logout', authController.getLogoutPage);

module.exports = router;