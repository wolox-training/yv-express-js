// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { validateSignUpSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSignUpSchema], userController.signUp);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
