const { validationResult } = require('express-validator');

function validate(rules) {
    return async (req, res, next) => {
        for (const rule of rules) {
        await rule.run(req);
        }
        const result = validationResult(req);
        if (result.isEmpty()) return next();
        const errors = result.array().map((e) => ({ path: e.path, message: e.msg }));
        return res.status(400).json({ errors });
    };
}

module.exports = { validate };