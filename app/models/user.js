const bcrypt = require('bcrypt');
const { generateHash } = require('../helpers/encrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      name: { type: DataTypes.STRING, required: true },
      lastName: { type: DataTypes.STRING, required: true },
      mail: { type: DataTypes.STRING, required: true, unique: true, isEmail: true },
      password: { type: DataTypes.STRING, required: true }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  User.beforeSave(async user => {
    if (user.changed('password')) {
      const salt = await generateHash();
      // eslint-disable-next-line require-atomic-updates
      user.password = await bcrypt.hash(user.password, salt);
    }
  });
  return User;
};
