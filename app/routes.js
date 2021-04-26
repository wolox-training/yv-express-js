const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { validateAccess } = require('./middlewares/auth');
const { validateSignUpSchema, validateSignInSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSignUpSchema], userController.signUp);
  app.get('/users/', [validateAccess], userController.getUsers);
  app.post('/users/sessions', [validateSignInSchema], userController.signIn);
};
