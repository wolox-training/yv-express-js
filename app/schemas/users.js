const { body } = require('express-validator');
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
  body('lastName')
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
