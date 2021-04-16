const { body, validationResult } = require('express-validator');
const { existUserMail } = require('../services/users');
const config = require('../../config');

const { regexWoloxDomains } = config.constants;

exports.signUpSchema = () => [
  body('name')
    .not()
    .trim()
    .escape()
    .isEmpty()
    .withMessage('Name is required'),
  body('last_name')
    .not()
    .trim()
    .escape()
    .isEmpty()
    .withMessage('Lastname is required'),
  body('mail')
    .not()
    .trim()
    .escape()
    .isEmpty()
    .normalizeEmail()
    .withMessage('Mail is required'),
  body('mail')
    .isEmail()
    .withMessage('The mail format is invalid'),
  body('mail')
    .matches(regexWoloxDomains)
    .withMessage('The mail domain is invalid'),
  body('mail').custom(async newMail => {
    const mailExist = await existUserMail(newMail);

    if (mailExist) {
      throw new Error('Email address already taken');
    }
  }),
  body('password')
    .not()
    .trim()
    .escape()
    .isEmpty()
    .withMessage('Password is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 chars long')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};
