const { body } = require('express-validator');

exports.registerUserValidator = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .custom(async (req) => {
            const existingUsername = await User.findOne({ where: { username } });
            if (existingUsername) {
                throw new Error('Username already taken');
            }
            return true;
        }),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
