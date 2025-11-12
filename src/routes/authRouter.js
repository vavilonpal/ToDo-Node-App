const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const {registerUserValidator, loginUserValidator, validate} = require("../validators/userValidator");
const auth = require('../middleware/auth/auth.middleware');
// Register end-point
router.post(
    '/register',
    ...registerUserValidator,
    validate,
    controller.register
);

// Login end-point
router.post(
    '/login',
    ...loginUserValidator,
    validate,
    controller.login
);

// GET user profile end-point
router.get(
    '/profile',
    auth,
    controller.profile
);


module.exports = router;