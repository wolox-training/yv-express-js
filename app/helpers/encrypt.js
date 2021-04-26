const bcrypt = require('bcrypt');
const config = require('../../config');

const { roundsToEncryptHash } = config.constants;

exports.encryptPassword = strPassword => {
  const salt = bcrypt.genSaltSync(roundsToEncryptHash);
  return bcrypt.hashSync(strPassword, salt);
};

exports.checkPassword = (strPassword, encryptPassword) => bcrypt.compareSync(strPassword, encryptPassword);
