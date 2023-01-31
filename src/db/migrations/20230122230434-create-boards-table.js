'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boards', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          require: true,
        },
        description: {
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.INTEGER,

          references: {
            model: 'users',
            key: 'id',
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('boards');
  }
}
;
