
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// register user route

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUsers);


// login user route

// router.post('/login', userController.loginUser);

module.exports = router;
