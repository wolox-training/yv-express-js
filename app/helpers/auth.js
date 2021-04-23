const jwt = require('jsonwebtoken');
const config = require('../../config');
const logger = require('../logger');

const { jwtSecretKey, jwtExpiresIn } = config.constants.jwt;

exports.generateAccessToken = payload => jwt.sign({ ...payload }, jwtSecretKey, { expiresIn: jwtExpiresIn });
exports.verifyToken = token =>
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      logger.error(`verifyToken Error => ${err.message}`);
      return false;
    }

    return decoded;
  });
