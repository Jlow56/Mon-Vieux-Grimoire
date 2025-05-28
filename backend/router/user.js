const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSignup } = require('../middlewares/validateUser');

router.post("/login", userController.login.bind(userController));
router.post("/signup",validateSignup, userController.signup.bind(userController));


module.exports = router;