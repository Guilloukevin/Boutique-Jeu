const express = require("express")
,     router = express.Router()
,     authController = require('../controllers/auth.controller');

// Methode Get : formulaire pour ajouter un utilisateur
router.get('/register', authController.getRegisterPage);

// Methode Post :
router.post('/register', authController.postRegisterPage);

module.exports = router;