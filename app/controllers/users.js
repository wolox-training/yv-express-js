const logger = require('../logger');
const userServices = require('../services/users');
const { notFoundError } = require('../errors');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userCreated = await userServices.signUpUser(body);

    if (!userCreated && !userCreated.id) {
      notFoundError('User not registered');
      return false;
    }

    logger.info(`User [${userCreated.name}] has been created succesfully`);
    return res.status(200).send(`User [${userCreated.name}] has been created succesfully`);
  } catch (error) {
    return next(error);
  }
};
