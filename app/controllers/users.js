const logger = require('../logger');
const userServices = require('../services/users');
const { notFoundError, unauthorizedError } = require('../errors');
const { objIsEmpty } = require('../mappers/commonObjectsValidations');
const { generateAccessToken } = require('../helpers/auth');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userCreated = await userServices.signUpUser(body);

    if (!userCreated && !userCreated.id) {
      return next(notFoundError('User not registered'));
    }

    logger.info(`User [${userCreated.name}] has been created succesfully`);
    return res.status(201).send(`User [${userCreated.name}] has been created succesfully`);
  } catch (error) {
    return next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    const user = await userServices.getUserByEmailAndPassword(mail, password);

    if (objIsEmpty(user)) {
      return next(unauthorizedError('Mail or Password are incorrect'));
    }

    const token = await generateAccessToken({ uniqueKey: user.id });

    return res.status(200).json({ user, token });
  } catch (error) {
    return next(error);
  }
};
