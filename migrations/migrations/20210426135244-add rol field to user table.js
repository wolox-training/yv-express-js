'use strict';
const {
  constants: { userRoles }
} = require('../../config');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('users', 'rol', {
        // eslint-disable-next-line new-cap
        type: Sequelize.ENUM(userRoles),
        allowNull: false,
        defaultValue: userRoles[1]
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'rol', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
