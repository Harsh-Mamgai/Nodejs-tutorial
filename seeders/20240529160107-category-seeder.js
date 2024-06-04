'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //by this method we can insert initial bulk data to the table categories
    return queryInterface.bulkInsert('categories', [
      {
        name: 'NodeJs',
        createdAt: "2024-04-19 12:07:20",
        updatedAt: "2024-05-15 17:50:47"
      },
      {
        name: 'VueJs',
        createdAt: "2024-04-19 12:07:20",
        updatedAt: "2024-05-15 17:50:47"
      },
      {
        name: 'ReactJs',
        createdAt: "2024-04-19 12:07:20",
        updatedAt: "2024-05-15 17:50:47"
      },
      {
        name: 'ReactNative',
        createdAt: "2024-04-19 12:07:20",
        updatedAt: "2024-05-15 17:50:47"
      },
      {
        name: 'Laravel',
        createdAt: "2024-04-19 12:07:20",
        updatedAt: "2024-05-15 17:50:47"
      },
      {
        name: 'Flutter',
        createdAt: "2024-04-19 12:07:20",
        updatedAt: "2024-05-15 17:50:47"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', {}, null);
  }
};
