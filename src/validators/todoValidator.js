const { body } = require('express-validator');

exports.createTodoValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2, max: 120 }).withMessage('Title must be between 2 and 120 characters'),

    body('category_id')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

    body('due_date')
        .optional({ nullable: true })
        .isISO8601().withMessage('Invalid date format, must be ISO string (YYYY-MM-DD)')
];

exports.updateTodoValidator = [
    body('title')
        .optional()
        .isLength({ min: 2, max: 120 }).withMessage('Title must be between 2 and 120 characters'),

    body('completed')
        .optional()
        .isBoolean().withMessage('Completed must be boolean'),

    body('category_id')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

    body('due_date')
        .optional({ nullable: true })
        .isISO8601().withMessage('Invalid date format, must be ISO string (YYYY-MM-DD)')
];
