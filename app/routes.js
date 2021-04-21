const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { validateSignUpSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSignUpSchema], userController.signUp);
};
