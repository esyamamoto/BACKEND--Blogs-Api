'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('blog_posts', {
      id : {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        allowNull:false, 
        autoIncrement: true
      },
      title: Sequelize.STRING,
      content: { 
      type: Sequelize.TEXT,
      allowNull: false
      },
      user_id: { 
        type: Sequelize.INTEGER,
        references : {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      published: {
        type: Sequelize.DATE,
        onUpdate: 'NOW()',
        allowNull: false
      },
      updated: {
        type: Sequelize.DATE,
        onUpdate: 'NOW()',
        allowNull: false
      },
  });
},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('blog_posts');
  }
}
