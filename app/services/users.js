const { databaseError } = require('../errors');
const logger = require('../logger');
const { users: userModel } = require('../models');

exports.signUpUser = async data => {
  try {
    const result = await userModel.create(data);

    if (!result) {
      logger.error('signUpUser database error');
      return databaseError('signUpUser database error');
    }
    return result;
  } catch (error) {
    logger.error(`signUpUser Error => ${error}`);
    return new Error(`signUpUser Error => ${error.message}`);
  }
};

exports.existUserMail = async mail => {
  try {
    const result = await userModel.findAndCountAll({ where: { mail } });
    return !!result.count;
  } catch (error) {
    logger.error(`signUpUser Error => ${error}`);
    return new Error(`signUpUser Error => ${error.message}`);
  }
};
