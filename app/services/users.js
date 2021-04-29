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
    throw databaseError('signUpUser database error');
  }
};

exports.existUserMail = async mail => {
  try {
    const result = await userModel.findAndCountAll({ where: { mail } });
    return !!result.count;
  } catch (error) {
    logger.error(`signUpUser Error => ${error}`);
    throw databaseError('signUpUser database error');
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
    throw databaseError('getUserByEmailAndPassword database error');
  }
};

exports.getUserByAttribute = condition => {
  try {
    return userModel.findOne({ where: { ...condition } });
  } catch (error) {
    logger.error(`getUserByAttribute Error => ${error}`);
    throw databaseError('getUserByAttribute database error');
  }
};

exports.getUserById = id => {
  try {
    return userModel.findByPk(id);
  } catch (error) {
    logger.error(`getUserById Error => ${error}`);
    throw databaseError('getUserById database error');
  }
};

exports.getUsersList = async (options = {}) => {
  try {
    const returnOptions = {
      limit: parseInt(options.limit),
      offset: parseInt(options.offset)
    };
    const conditions = {
      ...options,
      attributes: { exclude: ['password'] }
    };

    const { rows: users, count } = await userModel.findAndCountAll(conditions);

    return {
      users,
      count: users.length,
      totalUsers: count,
      totalPages: Math.ceil(count / users.length),
      ...returnOptions
    };
  } catch (error) {
    logger.error(`getUsersList Error => ${error}`);
    throw databaseError('getUsersList database error');
  }
};

exports.adminSignUp = async data => {
  try {
    const mail = data.mail ? data.mail : '';
    const existMail = await this.existUserMail(mail);
    let result = '';

    if (existMail) {
      const user = await this.getUserByAttribute({ mail });
      result = await user.update(data, { where: { mail } });
    } else {
      result = await userModel.create(data);
    }

    if (!result) {
      logger.error('adminSignUpUser database error');
      return databaseError('adminSignUpUser database error');
    }
    return {
      userRegistered: result,
      isNewUser: !existMail
    };
  } catch (error) {
    logger.error(`adminSignUpUser Error => ${error}`);
    throw databaseError('adminSignUpUser database error');
  }
};
