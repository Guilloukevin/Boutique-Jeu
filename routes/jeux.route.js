const express = require("express")
,     router = express.Router()
,     jeuxController = require('../controllers/jeux.controller')




 
// Jeux
router.get('/liste-jeux', jeuxController.getListeJeuxPage);

// Ajout Jeux
router.get('/ajouter-jeux', jeuxController.getAjouterJeuxPage);
router.post('/ajouter-jeux', jeuxController.postAjouterJeuxPage);


 // Suppréssion Jeux
router.get('/supprimer-jeux', jeuxController.getListeJeuxPage);
router.get('/supprimer-jeux', jeuxController.getSupprimerJeuxPage);
//router.delete('/supprimer-jeux', jeuxController.deleteSupprimerJeuxPage)

// Mise à jour Jeux
// router.get('/liste-jeux', jeuxController.getListeJeuxPage);
// router.get('/modifier-jeux', jeuxController.)
// router.put('/modifier-jeux', jeuxController.putModifierJeuxPage);




module.exports = router;