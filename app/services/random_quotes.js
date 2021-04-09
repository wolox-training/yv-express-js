const httpClient = require('../helpers/http_client');
const logger = require('../logger');
const config = require('../../config');

const API_URL = config.common.external.quoteApiUrl;

const getQuote = async (number = 'random', type = '') => {
  try {
    const typePrefix = type ? '/' : '';
    const url = `${API_URL}/${number}${typePrefix}${type}`;

    return await httpClient('get', url);
  } catch (error) {
    logger.error(`getQuote Error => ${error.message}`);
    return new Error(`getQuote Error => ${error.message}`);
  }
};

module.exports = { getQuote };
