const { isEmpty } = require('lodash');

exports.objIsEmpty = obj => isEmpty(obj);
exports.objIsNotEmpty = obj => !isEmpty(obj);
