const faker = require('faker');

const body = {
  name: faker.name.findName(),
  lastName: faker.name.lastName(),
  mail: faker.internet.email(null, null, 'wolox.co'),
  password: faker.internet.password(8)
};

exports.mockUserSuccess = body;

// Missing params
exports.mockUserMissingName = {
  ...body,
  name: ''
};

exports.mockUserMissingLastName = {
  ...body,
  lastName: ''
};

exports.mockUserMissingMail = {
  ...body,
  mail: ''
};

exports.mockUserMissingPassword = {
  ...body,
  password: ''
};

// Wrong params
exports.mockUserWrongMailDomain = {
  ...body,
  mail: faker.internet.email(null, null, 'gmail.co')
};

exports.mockUserWrongPassword = {
  ...body,
  password: faker.internet.password(7)
};
