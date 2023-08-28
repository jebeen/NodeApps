const { check,sanitizeBody } = require('express-validator');

const rules=[
      // email validation
    check('email').trim().notEmpty().withMessage('Email required')
    .not().matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage('Only Characters with white space are allowed'),

    // password validation
    check('password').trim().notEmpty().withMessage('Password required')
    .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
    .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
    .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
    .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
    .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
    .not().matches(/^$|\s+/).withMessage('White space not allowed'),
]

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pictures/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {

  upload.array('picture', 1)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const files = req.files;
    const errors = [];

    files.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 1 * 1024 * 1024;

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }

    req.files = files;

    next();
  });
};

module.exports={
  rules,
  uploadMiddleware
}
