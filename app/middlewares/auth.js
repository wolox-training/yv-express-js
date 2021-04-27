const { unauthorizedError } = require('../errors');
const { verifyToken } = require('../helpers/auth');
const logger = require('../logger');
const { objIsNotEmpty } = require('../mappers/commonObjectsValidations');
const userService = require('../services/users');

exports.validateAccess = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s+/, '') : '';

    const tokenDecoded = await verifyToken(token);

    if (!tokenDecoded) {
      return next(unauthorizedError('Unauthorized access'));
    }

    // eslint-disable-next-line require-atomic-updates
    req.tokenDecoded = tokenDecoded;
    return next();
  } catch (error) {
    logger.error(`validateAccess Error => ${error}`);
    return new Error(`validateAccess Error => ${error.message}`);
  }
};

exports.validateAdminAccess = async (req, res, next) => {
  const id = req.tokenDecoded.uniqueKey;

  const user = await userService.getUserById(id);

  if (objIsNotEmpty(user) && user.rol !== 'Admin') {
    return next(unauthorizedError('Unauthorized access'));
  }

  return next();
};
