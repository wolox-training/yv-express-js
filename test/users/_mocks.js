/* eslint-disable id-length */
const faker = require('faker');
const {
  constants: { userRoles }
} = require('../../config');

const adminRol = userRoles[0];
const regularRol = userRoles[1];

const regularBody = {
  name: faker.name.findName(),
  lastName: faker.name.lastName(),
  mail: faker.internet.email(null, null, 'wolox.co'),
  password: faker.internet.password(8),
  rol: regularRol
};

const loginBody = {
  mail: regularBody.mail,
  password: regularBody.password
};

const adminBody = {
  ...regularBody,
  mail: faker.internet.email(null, null, 'wolox.co'),
  rol: adminRol
};

const loginAdminBody = {
  mail: adminBody.mail,
  password: adminBody.password
};

const userListBodies = [
  {
    name: faker.name.findName(),
    lastName: faker.name.lastName(),
    mail: faker.internet.email(null, null, 'wolox.co'),
    password: faker.internet.password(8),
    rol: regularRol
  },
  {
    name: faker.name.findName(),
    lastName: faker.name.lastName(),
    mail: faker.internet.email(null, null, 'wolox.co'),
    password: faker.internet.password(8),
    rol: regularRol
  },
  {
    name: faker.name.findName(),
    lastName: faker.name.lastName(),
    mail: faker.internet.email(null, null, 'wolox.co'),
    password: faker.internet.password(8),
    rol: regularRol
  },
  {
    name: faker.name.findName(),
    lastName: faker.name.lastName(),
    mail: faker.internet.email(null, null, 'wolox.co'),
    password: faker.internet.password(8),
    rol: regularRol
  }
];

exports.mockRegularUserSuccess = regularBody;

// Missing params
exports.mockRegularUserMissingName = {
  ...regularBody,
  name: ''
};

exports.mockRegularUserMissingLastName = {
  ...regularBody,
  lastName: ''
};

exports.mockRegularUserMissingMail = {
  ...regularBody,
  mail: ''
};

exports.mockRegularUserMissingPassword = {
  ...regularBody,
  password: ''
};

// Wrong params
exports.mockRegularUserWrongMailDomain = {
  ...regularBody,
  mail: faker.internet.email(null, null, 'gmail.co')
};

exports.mockRegularUserWrongPassword = {
  ...regularBody,
  password: faker.internet.password(7)
};

// ##### Mocks to users/sessions endpoint
exports.mockRegularUserSignInSuccess = loginBody;

exports.mockRegularUserSignInMissingMail = {
  ...loginBody,
  mail: ''
};

exports.mockRegularUserSignInMissingPassword = {
  ...loginBody,
  password: ''
};

exports.mockRegularUserSignInWrongMail = {
  ...loginBody,
  mail: faker.internet.email(null, null, 'gmail.co')
};

exports.mockRegularUserSignInWrongPassword = {
  ...loginBody,
  password: faker.internet.password(9)
};

// ##### Mocks to GET users endpoint

exports.mockListUsersSuccess = userListBodies;

// ##### Mocks to admin/users endpoint

exports.mockAdminUserSuccess = adminBody;

exports.mockAdminSignInSuccess = loginAdminBody;

exports.mockUpdateAdminUserSuccess = {
  ...adminBody,
  mail: regularBody.mail
};

exports.mockAdminUserWrongRol = {
  ...adminBody,
  mail: faker.internet.email(null, null, 'wolox.co'),
  rol: regularRol
};
