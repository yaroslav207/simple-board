'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        require: true,
      },
      email: {
        type: Sequelize.STRING,
        require: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        require: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        default: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: new Date()
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
