const { query } = require('express-validator');

exports.listProjectsRules = [
    query('q').optional().isString().withMessage('q must be a string').trim(),
    query('role').optional().isString().withMessage('role must be a string').trim(),
    query('page').optional().isInt({ min: 1 }).withMessage('page must be an integer >= 1'),
    query('size').optional().isInt({ min: 1, max: 100 }).withMessage('size must be an integer between 1 and 100')
];