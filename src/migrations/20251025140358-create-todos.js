'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('todos', {
          id: {
              allowNull: false,
              primaryKey: true,
              type: Sequelize.UUID,
              defaultValue: Sequelize.literal('gen_random_uuid()') // или Sequelize.UUIDV4
          },
          title: {
              type: Sequelize.TEXT,
              allowNull: false
          },
          completed: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
          },
          category_id: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'categories',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
              allowNull: true
          },
          due_date: {
              type: Sequelize.DATE,
              allowNull: true
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
      await queryInterface.dropTable('todos');
  }
};
