const { validationResult } = require('express-validator');

const logger = require('../logger');
const userServices = require('../services/users');
const { notFoundError } = require('../errors');

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { body } = req;
    const userCreated = await userServices.signUpUser(body);

    if (!userCreated.id) {
      notFoundError('User not registered');
      return false;
    }

    logger.info(`User [${userCreated.name}] has been created succesfully`);
    res.send(`User [${userCreated.name}] has been created succesfully`);
    return true;
  } catch (error) {
    return next(error);
  }
};
