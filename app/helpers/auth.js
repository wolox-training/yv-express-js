const jwt = require('jsonwebtoken');
const config = require('../../config');

const { jwtSecretKey, jwtExpiresIn } = config.constants.jwt;

exports.generateAccessToken = payload => jwt.sign({ ...payload }, jwtSecretKey, { expiresIn: jwtExpiresIn });
