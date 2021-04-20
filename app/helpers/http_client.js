const axios = require('axios');
const logger = require('../logger');

const { httpClientError } = require('../errors');

// eslint-disable-next-line arrow-body-style
const httpClient = (method, url, data = '') =>
  axios({ method, url, data })
    .then(response => response.data)
    .catch(error => {
      logger.error(`httpClient Error => ${error.message}`);
      httpClientError(`httpClient Error => ${error.message}`);
    });

module.exports = httpClient;
