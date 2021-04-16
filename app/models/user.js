module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      name: { type: DataTypes.STRING, required: true },
      last_name: { type: DataTypes.STRING, required: true },
      mail: { type: DataTypes.STRING, required: true, unique: true, isEmail: true },
      password: { type: DataTypes.STRING, required: true }
    },
    {
      timestamps: false
    }
  );
  return User;
};