const { databaseError } = require('../errors');
const { checkPassword } = require('../helpers/encrypt');
const logger = require('../logger');
const { objIsNotEmpty } = require('../mappers/commonObjectsValidations');
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

exports.getUserByEmailAndPassword = async (mail, newPassword) => {
  try {
    let hasCorrectParameters = false;
    const userData = await userModel.findOne({ where: { mail } });

    if (objIsNotEmpty(userData) && userData.password) {
      hasCorrectParameters = await checkPassword(newPassword, userData.password);
    }

    return hasCorrectParameters ? userData : {};
  } catch (error) {
    logger.error(`getUserByEmailAndPassword Error => ${error}`);
    return new Error(`getUserByEmailAndPassword Error => ${error.message}`);
  }
};

exports.getUsersList = async (options = {}) => {
  try {
    const returnOptions = {};
    const conditions = {
      ...options,
      attributes: { exclude: ['password'] }
    };

    const users = await userModel.findAll(conditions);
    const totalUsers = await userModel.count();

    if (options.limit && options.offset) {
      returnOptions.limit = options.limit;
      returnOptions.offset = options.offset;
    }

    return {
      users,
      count: users.length,
      totalUsers,
      ...returnOptions
    };
  } catch (error) {
    logger.error(`getUsersList Error => ${error}`);
    return new Error(`getUsersList Error => ${error.message}`);
  }
};
