const { check,sanitizeBody } = require('express-validator');
exports.rules=[
  // name validation
  check('name').trim().notEmpty().withMessage('Name required')

  // email validation
  check('email').trim().notEmpty().withMessage('Email required')
  .not().matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage('Only Characters with white space are allowed'),

  // password validation
  check('password').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 8 }).withMessage('password must be minimum 8 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),

]
