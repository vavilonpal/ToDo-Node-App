const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const {validate} = require("uuid");
const {registerUserValidator} = require("../validators/userValidator");
const { validationResult } = require('express-validator');


router.post('/register', registerUserValidator, async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    await controller.register(req, res)});
router.post('/login', controller.login);
router.get('/profile', controller.profile);

module.exports = router;