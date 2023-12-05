'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        allowNull:false, 
        autoIncrement: true},
      display_name: Sequelize.STRING,
      
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      
      image: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      }, 
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
