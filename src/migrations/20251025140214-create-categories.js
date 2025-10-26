'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('categories', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          name: {
              type: Sequelize.STRING(100),
              allowNull: false
          },
          created_at: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.literal('NOW()')
          },
          updated_at: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.literal('NOW()')
          }
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('categories');
  }
};
