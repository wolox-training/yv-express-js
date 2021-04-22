const supertest = require('supertest');

const app = require('../../app');

const {
  mockUserSuccess,
  mockUserMissingName,
  mockUserMissingLastName,
  mockUserMissingMail,
  mockUserWrongMailDomain,
  mockUserMissingPassword,
  mockUserWrongPassword,
  mockSignInSuccess,
  mockSignInMissingMail,
  mockSignInMissingPassword,
  mockSignInWrongMail,
  mockSignInWrongPassword
} = require('./_mocks');

const request = supertest(app);
const postUserHelperRequest = mockData => request.post('/users').send(mockData);
const postLoginHelperRequest = mockData => request.post('/users/sessions').send(mockData);

describe('=== TESTING POST:/users endpoint ===', () => {
  // TO DO => How to validate a type value
  describe('** Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserSuccess);
      done();
    });
    test('---> The status code must be "201" <---', () => {
      expect(response.statusCode).toBe(201);
    });
    test(`---> The response text must be "User [${mockUserSuccess.name}] has been created succesfully" <---`, () => {
      expect(response.text).toBe(`User [${mockUserSuccess.name}] has been created succesfully`);
    });
  });

  describe('** Missing name', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserMissingName);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Name is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Name is required');
    });
  });

  describe('** Missing lastName', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserMissingLastName);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Lastname is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Lastname is required');
    });
  });

  describe('** Missing mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserMissingMail);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Mail is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Mail is required');
    });
  });

  describe('** Exist user mail', () => {
    let response = {};
    beforeAll(async done => {
      await postUserHelperRequest(mockUserSuccess);
      response = await postUserHelperRequest(mockUserSuccess);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Email address already taken" <---', () => {
      expect(response.body.errors[0].msg).toBe('Email address already taken');
    });
  });

  describe('** Wrong mail domain', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserWrongMailDomain);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "The mail domain is invalid" <---', () => {
      expect(response.body.errors[0].msg).toBe('The mail domain is invalid');
    });
  });

  describe('** Missing password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserMissingPassword);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Password is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password is required');
    });
  });

  describe('** Wrong password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postUserHelperRequest(mockUserWrongPassword);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Password should be at least 8 chars long" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password should be at least 8 chars long');
    });
  });
});

describe('=== TESTING POST:/users/sessions endpoint ===', () => {
  describe('** Succesfull params', () => {
    let response = {};
    beforeAll(async done => {
      await postUserHelperRequest(mockUserSuccess);
      response = await postLoginHelperRequest(mockSignInSuccess);
      done();
    });

    it('---> The status code must be "200" <---', () => {
      expect(response.statusCode).toBe(200);
    });

    it('---> The response body should have "user property" <---', () => {
      expect(response.body).toHaveProperty('user');
    });

    it(`---> The response user mail must be [${mockSignInSuccess.mail}] <---`, () => {
      expect(response.body.user.mail).toBe(mockSignInSuccess.mail);
    });

    it('---> The response body should have "token property" <---', () => {
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('** Missing mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockSignInMissingMail);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Mail is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Mail is required');
    });
  });

  describe('** Wrong mail', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockSignInWrongMail);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "The mail domain is invalid" <---', () => {
      expect(response.body.errors[0].msg).toBe('The mail domain is invalid');
    });
  });

  describe('** Missing password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockSignInMissingPassword);
      done();
    });

    it('---> The status code must be "400" <---', () => {
      expect(response.statusCode).toBe(400);
    });

    it('---> The response body error must be "Password is required" <---', () => {
      expect(response.body.errors[0].msg).toBe('Password is required');
    });
  });

  describe('** Wrong password', () => {
    let response = {};
    beforeAll(async done => {
      response = await postLoginHelperRequest(mockSignInWrongPassword);
      done();
    });

    it('---> The status code must be "401" <---', () => {
      expect(response.statusCode).toBe(401);
    });

    it('---> The response body error must be "Mail or Password are incorrect" <---', () => {
      expect(response.body.message).toBe('Mail or Password are incorrect');
    });
  });
});
