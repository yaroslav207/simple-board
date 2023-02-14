'use strict';

const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
        name: 'user',
        email: 'user@gmail.com',
        password: await hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
     },
      {
        name: 'user2',
        email: 'user2@gmail.com',
        password: await hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user3',
        email: 'user3@gmail.com',
        password: await hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
