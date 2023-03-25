"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "danglinh@gmail.com",
          password: "123",
          username: "linh",
        },
        {
          email: "demo@gmail.com",
          password: "123",
          username: "demo1",
        },
        {
          email: "test@gmail.com",
          password: "123",
          username: "test",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
