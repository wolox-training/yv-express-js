/* eslint-disable id-length */
/* eslint max-lines: ["error", {"max": 1000, "skipComments": true}] */
const supertest = require('supertest');

const app = require('../../app');
const {
  mockRegularUserSuccess,
  mockRegularUserMissingName,
  mockRegularUserMissingLastName,
  mockRegularUserMissingMail,
  mockRegularUserWrongMailDomain,
  mockRegularUserMissingPassword,
  mockRegularUserWrongPassword,
  mockRegularUserSignInSuccess,
  mockRegularUserSignInMissingMail,
  mockRegularUserSignInMissingPassword,
  mockRegularUserSignInWrongMail,
  mockRegularUserSignInWrongPassword,
  mockListUsersSuccess,
  mockAdminUserSuccess,
  mockAdminSignInSuccess,
  mockAdminUserWrongRol,
  mockUpdateAdminUserSuccess
} = require('./_mocks');

const request = supertest(app);
let userToken = '123';
let adminUserToken = '123';

const postUserHelperRequest = mockData => request.post('/users').send(mockData);
const postLoginHelperRequest = mockData => request.post('/users/sessions').send(mockData);
const getUsersHelperRequest = token =>
  request
    .get('/users')
    .set('Authorization', token)
    .send();
const postAdminSignUpHelperRequest = mockData =>
  request
    .post('/admin/users')
    .set('Authorization', adminUserToken)
    .send(mockData);

describe('=== TESTING POST:/users endpoint ===', () => {
  // TO DO => How to validate a type value
  describe('** Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserSuccess);
      done();
    });

    test('---> The status code must be "201" <---', () => {
      expect(response.statusCode).toBe(201);
    });

    test(`---> The response text must be "User [${mockRegularUserSuccess.name}] has been created succesfully" <---`, () => {
      expect(response.text).toBe(`User [${mockRegularUserSuccess.name}] has been created succesfully`);
    });
  });

  describe('** Missing name', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserMissingName);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Name is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Name is required');
    });
  });

  describe('** Missing lastName', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserMissingLastName);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Lastname is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Lastname is required');
    });
  });

  describe('** Missing mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserMissingMail);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Mail is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Mail is required');
    });
  });

  describe('** Exist user mail', () => {
    let response = {};
    beforeAll(async done => {
      await postUserHelperRequest(mockRegularUserSuccess);
      response = await postUserHelperRequest(mockRegularUserSuccess);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Email address already taken" <---', () => {
      expect(response.body.errors[0].msg).toBe('Email address already taken');
    });
  });

  describe('** Wrong mail domain', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserWrongMailDomain);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "The mail domain is invalid" <---', () => {
      expect(response.body.errors[0].msg).toBe('The mail domain is invalid');
    });
  });

  describe('** Missing password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserMissingPassword);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Password is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password is required');
    });
  });

  describe('** Wrong password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockRegularUserWrongPassword);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Password should be at least 8 chars long" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password should be at least 8 chars long');
    });
  });
});

describe('=== TESTING POST:/users/sessions endpoint ===', () => {
  describe('** Regular User Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      await postUserHelperRequest(mockRegularUserSuccess);
      response = await postLoginHelperRequest(mockRegularUserSignInSuccess);
      userToken = response.body.token ? `Bearer ${response.body.token}` : '';
      done();
    });

    test('---> The status code must be "200" <---', () => {
      expect(response.statusCode).toBe(200);
    });

    test('---> The response body should be have "user property" <---', () => {
      expect(response.body).toHaveProperty('user');
    });

    test(`---> The response user mail must be [${mockRegularUserSignInSuccess.mail}] <---`, () => {
      expect(response.body.user.mail).toBe(mockRegularUserSignInSuccess.mail);
    });

    test('---> The response body should be have "token property" <---', () => {
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('** Admin User Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      await postUserHelperRequest(mockAdminUserSuccess);
      response = await postLoginHelperRequest(mockAdminSignInSuccess);
      adminUserToken = response.body.token ? `Bearer ${response.body.token}` : '';
      done();
    });

    test('---> The status code must be "200" <---', () => {
      expect(response.statusCode).toBe(200);
    });

    test('---> The response body should be have "user property" <---', () => {
      expect(response.body).toHaveProperty('user');
    });

    test(`---> The response user mail must be [${mockAdminSignInSuccess.mail}] <---`, () => {
      expect(response.body.user.mail).toBe(mockAdminSignInSuccess.mail);
    });

    test('---> The response body should be have "token property" <---', () => {
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('** Missing mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockRegularUserSignInMissingMail);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Mail is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Mail is required');
    });
  });

  describe('** Wrong mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockRegularUserSignInWrongMail);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "The mail domain is invalid" <---', () => {
      expect(response.body.errors[0].msg).toBe('The mail domain is invalid');
    });
  });

  describe('** Missing password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockRegularUserSignInMissingPassword);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Password is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password is required');
    });
  });

  describe('** Wrong password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockRegularUserSignInWrongPassword);
      done();
    });

    test('---> The status code must be "401" <---', () => {
      expect(response.statusCode).toBe(401);
    });

    test('---> The response body error must be "Mail or Password are incorrect" <---', () => {
      expect(response.body.message).toBe('Mail or Password are incorrect');
    });
  });
});

describe('=== TESTING GET:/users endpoint ===', () => {
  describe('**Regular user Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      for await (const user of mockListUsersSuccess) {
        await postUserHelperRequest(user);
      }
      response = await getUsersHelperRequest(userToken);
      done();
    });

    test('---> The status code must be "200" <---', () => {
      expect(response.statusCode).toBe(200);
    });

    test('---> The response body should have "users property" <---', () => {
      expect(response.body).toHaveProperty('users');
    });

    test('---> The response body should have "count property" <---', () => {
      expect(response.body).toHaveProperty('count');
    });

    test(`---> The response users count must be ${mockListUsersSuccess.length} <---`, () => {
      expect(response.body.count).toBe(mockListUsersSuccess.length);
    });
  });

  describe('** Missing token', () => {
    let response = {};
    beforeAll(async done => {
      response = await getUsersHelperRequest('');
      done();
    });

    test('---> The status code must be "401" <---', () => {
      expect(response.statusCode).toBe(401);
    });

    test('---> The response body must be "Unauthorized access" error <---', () => {
      // test internalCode , response.body
      expect(response.body.message).toBe('Unauthorized access');
    });
  });
});

describe('=== TESTING POST:/admin/users endpoint ===', () => {
  // TO DO => How to validate a type value
  describe('** Create user Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockAdminUserSuccess);
      done();
    });

    test('---> The status code must be "201" <---', () => {
      expect(response.statusCode).toBe(201);
    });

    test(`---> The response text must be "User [${mockAdminUserSuccess.name}] has been created succesfully" <---`, () => {
      expect(response.text).toBe(`User [${mockAdminUserSuccess.name}] has been created succesfully`);
    });
  });

  describe('** Update user Succesfull params', () => {
    let responseUpdate = {};
    beforeAll(async done => {
      await postAdminSignUpHelperRequest(mockUpdateAdminUserSuccess);
      responseUpdate = await postAdminSignUpHelperRequest(mockUpdateAdminUserSuccess);
      done();
    });

    test('---> The status (update admin) code must be "202" <---', () => {
      expect(responseUpdate.statusCode).toBe(202);
    });

    test(`---> The response (update admin) text must be "User [${mockUpdateAdminUserSuccess.name}] has been updated succesfully" <---`, () => {
      expect(responseUpdate.text).toBe(
        `User [${mockUpdateAdminUserSuccess.name}] has been updated succesfully`
      );
    });
  });

  describe('** Missing name', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockRegularUserMissingName);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Name is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Name is required');
    });
  });

  describe('** Missing lastName', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockRegularUserMissingLastName);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Lastname is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Lastname is required');
    });
  });

  describe('** Missing mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockRegularUserMissingMail);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Mail is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Mail is required');
    });
  });

  describe('** Wrong mail domain', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockRegularUserWrongMailDomain);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "The mail domain is invalid" <---', () => {
      expect(response.body.errors[0].msg).toBe('The mail domain is invalid');
    });
  });

  describe('** Missing password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockRegularUserMissingPassword);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Password is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password is required');
    });
  });

  describe('** Wrong password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockRegularUserWrongPassword);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "Password should be at least 8 chars long" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password should be at least 8 chars long');
    });
  });

  describe('** Wrong user rol', () => {
    let response = {};
    beforeAll(async done => {
      response = await postAdminSignUpHelperRequest(mockAdminUserWrongRol);
      done();
    });

    test('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    test('---> The response body error must be "The rol is invalid" <---', () => {
      expect(response.body.errors[0].msg).toBe('The rol is invalid');
    });
  });
});
