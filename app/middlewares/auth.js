const { unauthorizedError, decodeTokenError } = require('../errors');
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

    Object.assign(req, { tokenDecoded });
    return next();
  } catch (error) {
    logger.error(`validateAccess Error => ${error}`);
    return next(decodeTokenError('An error was occurred when try to decode token'));
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
