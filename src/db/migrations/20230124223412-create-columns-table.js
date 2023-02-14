'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('columns', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        require: true,
      },
      boardId: {
        type: Sequelize.INTEGER,

        references: {
          model: 'boards',
          key: 'id',
        }
      },
      order: {
        type: Sequelize.INTEGER,
        require: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('columns');
  }
};
