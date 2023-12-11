'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull:false, 
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    content: 
    {
      type: DataTypes.STRING, 
      allowNull: false
    },
    userId: 
    {
      type: DataTypes.INTEGER, 
      references: {model: 'Users', key: 'id'}},
    published: 
    {
      type:DataTypes.DATE, 
      allowNull: false
    },
    updated: 
    {
      type: DataTypes.DATE, 
      allowNull: false
    },
    }, 
    {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
    });
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
    return BlogPost;
};