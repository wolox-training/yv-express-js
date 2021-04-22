const { existUserMail } = require('../services/users');

exports.standardBodyValidations = { in: 'body', trim: true, escape: true };

exports.validateIfIsEmptyField = errorMessage => ({
  isEmpty: {
    errorMessage,
    negated: true
  }
});
exports.validateIfExistUserMail = async newMail => {
  const mailExist = await existUserMail(newMail);

  if (mailExist) {
    throw new Error('Email address already taken');
  }
};
