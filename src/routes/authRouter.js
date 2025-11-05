const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const {registerUserValidator, loginUserValidator} = require("../validators/userValidator");
const {validationResult} = require('express-validator');
const auth = require('../middleware/auth/auth.middleware');
// Register end-point
router.post('/register',
    registerUserValidator,
    //Validation
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        await controller.register(req, res)
    }
);

// Login end-point
router.post(
    '/login',
    loginUserValidator,
    controller.login
);

// GET user profile end-point
router.get(
    '/profile',
    auth,
    controller.profile
);


module.exports = router;