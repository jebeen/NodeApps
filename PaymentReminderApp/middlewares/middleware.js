const { check,sanitizeBody } = require('express-validator');

const signupForm=[
  check('firstName').trim().notEmpty().withMessage('First Name required')
  .matches(/^[a-zA-Z ]+$/).withMessage('Only letters and whitespace are allowed'),

  check('lastName').trim().notEmpty().withMessage('Last Name required')
  .matches(/^[a-zA-Z ]+$/).withMessage('Only letters and whitespace are allowed'),

  check('email').trim().notEmpty().withMessage('Email required')
  .not().matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage('Only Characters with white space are allowed'),

  check('password').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  .isIn(['123', 'password', 'test']).withMessage('Do not use a common word as the password')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),

   check('confirmPassword').custom((value, { req }) => {
     if (value !== req.body.password) {
           throw new Error('Password Confirmation does not match password');
      }
    return true;
  })
];

const loginForm=[
  check('email').trim().notEmpty().withMessage('Email required')
  .not().matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage('Only Characters with white space are allowed'),

  check('password').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),
];

module.exports={
  signupForm,
  loginForm,
}
