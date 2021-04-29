const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { validateAccess, validateAdminAccess } = require('./middlewares/auth');
const { validateSignUpSchema, validateAdminSignUpSchema, validateSignInSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSignUpSchema], userController.signUp);
  app.post(
    '/admin/users',
    [validateAccess, validateAdminAccess, validateAdminSignUpSchema],
    userController.adminSignUp
  );
  app.get('/users/', [validateAccess], userController.getUsers);
  app.post('/users/sessions', [validateSignInSchema], userController.signIn);
};
