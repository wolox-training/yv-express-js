const bcrypt = require('bcrypt');
const config = require('../../config');

exports.generateHash = () => {
  const { roundsToEncryptHash } = config.constants;
  return bcrypt.genSalt(roundsToEncryptHash);
};
