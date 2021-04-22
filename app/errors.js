const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.HTTP_CLIENT_ERROR = 'http_client_error';
exports.httpClientError = message => internalError(message, exports.HTTP_CLIENT_ERROR);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);

exports.UNAUTHORIZED_ERROR = 'unauthorized_error';
exports.unauthorizedError = message => internalError(message, exports.UNAUTHORIZED_ERROR);
