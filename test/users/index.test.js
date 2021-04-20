const supertest = require('supertest');

const app = require('../../app');

const {
  mockUserSuccess,
  mockUserMissingName,
  mockUserMissingLastName,
  mockUserMissingMail,
  mockUserMissingPassword,
  mockUserWrongMailDomain,
  mockUserWrongPassword
} = require('./_mocks');

const request = supertest(app);

describe('=== TESTING POST:/users endpoint ===', () => {
  // TO DO => How to validate a type value
  it('** Succesfull params', async done => {
    await request
      .post('/users')
      .send(mockUserSuccess)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe(`User [${mockUserSuccess.name}] has been created succesfully`);
        done();
      });
  });

  it('** Missing name', async done => {
    await request
      .post('/users')
      .send(mockUserMissingName)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Name is required');
        done();
      });
  });

  it('** Missing lastName', async done => {
    await request
      .post('/users')
      .send(mockUserMissingLastName)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Lastname is required');
        done();
      });
  });

  it('** Missing mail', async done => {
    await request
      .post('/users')
      .send(mockUserMissingMail)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Mail is required');
        done();
      });
  });

  it('** Exist user mail', async done => {
    await request.post('/users').send(mockUserSuccess);
    await request
      .post('/users')
      .send(mockUserSuccess)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Email address already taken');
        done();
      });
  });

  it('** Wrong mail domain', async done => {
    await request
      .post('/users')
      .send(mockUserWrongMailDomain)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('The mail domain is invalid');
        done();
      });
  });

  it('** Missing password', async done => {
    await request
      .post('/users')
      .send(mockUserMissingPassword)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Password is required');
        done();
      });
  });

  it('** Wrong password', async done => {
    await request
      .post('/users')
      .send(mockUserWrongPassword)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('Password should be at least 8 chars long');
        done();
      });
  });
});
