const express = require('express');
const { signupValidator, loginValidator } = require('../middleware/validators');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', signupValidator, authController.signup);

router.post('/login', loginValidator, authController.login);

module.exports = router;
