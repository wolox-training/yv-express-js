const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { validateSignUpSchema, validateSignInSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSignUpSchema], userController.signUp);
  app.post('/users/sessions', [validateSignInSchema], userController.signIn);
};
