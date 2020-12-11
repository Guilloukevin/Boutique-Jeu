const express = require("express")
,     router = express.Router()
,     loginController = require('../controllers/login.controller')
,     registerController = require('../controllers/register.controller');

 
 
// Login
router.get('/login', loginController.getLoginPage);

// Register
router.get('/register', registerController.getRegisterPage);
// router.post('/register', registerController.postRegisterPage);


module.exports = router;