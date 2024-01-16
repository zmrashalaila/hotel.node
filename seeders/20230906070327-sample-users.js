'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id_user: 1,
        nama_user: 'User 1',
        foto: 'url_to_image_1.jpg',
        email: 'user1@example.com',
        password: 'password1',
        role: 'admin',
      },
      // Add more user records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // To remove all inserted data, you can use the bulkDelete method
    return queryInterface.bulkDelete('user', null, {});
  },
};
