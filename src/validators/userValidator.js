const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const {User} = require('../models');
const {ValidationError, UserExistError} = require("../errors/validation/errors");

const registerUserValidator = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .custom(async (username) => {
            const existingUsername = await User.findOne({where: {username}});
            if (existingUsername) {
                throw new Error('Username already taken');
            }
            return true;
        }),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingUser = await User.findOne({where: {email}});
            if (existingUser) {
                throw new Error('Email already in use');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long')
];

const loginUserValidator = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));

        return next(new ValidationError('Ошибка валидации данных', formattedErrors));
    }

    next();
};


module.exports = {
    registerUserValidator,
    loginUserValidator,
    validate,
};