const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { schemaValidate } = require('./middlewares/schemaValidate');
const { signUpSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', signUpSchema(), schemaValidate, userController.signUp);
};
