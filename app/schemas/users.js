const { checkSchema } = require('express-validator');

const config = require('../../config');
const { schemaValidate } = require('../middlewares/schemaValidate');

const { regexWoloxDomains } = config.constants;
const {
  standardBodyValidations,
  validateIfIsEmptyField,
  validateIfExistUserMail
} = require('../mappers/commonSchemaValidations');

const signUpSchema = {
  name: {
    ...standardBodyValidations,
    ...validateIfIsEmptyField('Name is required')
  },
  lastName: {
    ...standardBodyValidations,
    ...validateIfIsEmptyField('Lastname is required')
  },
  mail: {
    ...standardBodyValidations,
    ...validateIfIsEmptyField('Mail is required'),
    matches: {
      options: [regexWoloxDomains],
      errorMessage: 'The mail domain is invalid'
    },
    custom: {
      options: validateIfExistUserMail
    }
  },
  password: {
    ...standardBodyValidations,
    ...validateIfIsEmptyField('Password is required'),
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 }
    }
  }
};

const signInSchema = {
  mail: {
    ...standardBodyValidations,
    ...validateIfIsEmptyField('Mail is required'),
    matches: {
      options: [regexWoloxDomains],
      errorMessage: 'The mail domain is invalid'
    }
  },
  password: signUpSchema.password
};

exports.validateSignUpSchema = [checkSchema(signUpSchema), schemaValidate];
exports.validateSignInSchema = [checkSchema(signInSchema), schemaValidate];
