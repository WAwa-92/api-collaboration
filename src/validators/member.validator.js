const { body, param } = require('express-validator');

const projectIdRule = param('id').isInt({ min: 1 }).withMessage('Project id must be a positive integer');
const memberIdRule = param('memberId').isInt({ min: 1 }).withMessage('Member id must be a positive integer');

const memberBodyRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Member name is required').bail()
    .isLength({ max: 100 }).withMessage('Member name must be 100 characters max'),
  body('role')
    .trim()
    .notEmpty().withMessage('Member role is required').bail()
    .isLength({ max: 50 }).withMessage('Member role must be 50 characters max')
];

const memberPatchBodyRules = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Member name cannot be empty').bail()
    .isLength({ max: 100 }).withMessage('Member name must be 100 characters max'),
  body('role')
    .optional()
    .trim()
    .notEmpty().withMessage('Member role cannot be empty').bail()
    .isLength({ max: 50 }).withMessage('Member role must be 50 characters max'),
  body().custom((_value, { req }) => {
    if (req.body.name === undefined && req.body.role === undefined) {
      throw new Error('At least one of name or role is required');
    }
    return true;
  })
];

exports.projectIdRules = [projectIdRule];
exports.memberIdRules = [projectIdRule, memberIdRule];
exports.createMemberRules = [projectIdRule, ...memberBodyRules];
exports.updateMemberRules = [projectIdRule, memberIdRule, ...memberBodyRules];
exports.patchMemberRules = [projectIdRule, memberIdRule, ...memberPatchBodyRules];