// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');

const userController = require('./controllers/users');
const { schemaValidate } = require('./middlewares/schemaValidate');
const { signUpSchema } = require('./schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', signUpSchema(), schemaValidate, userController.signUp);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
