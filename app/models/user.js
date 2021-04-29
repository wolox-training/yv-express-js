const { encryptPassword } = require('../helpers/encrypt');
const {
  constants: { userRoles }
} = require('../../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      name: { type: DataTypes.STRING, required: true },
      lastName: { type: DataTypes.STRING, required: true },
      mail: { type: DataTypes.STRING, required: true, unique: true, isEmail: true },
      password: { type: DataTypes.STRING, required: true },
      rol: {
        // eslint-disable-next-line new-cap
        type: DataTypes.ENUM(userRoles),
        require: true,
        defaultValue: userRoles[1]
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  User.beforeSave(async user => {
    if (user.changed('password')) {
      // eslint-disable-next-line require-atomic-updates
      user.password = await encryptPassword(user.password);
    }
  });
  return User;
};
