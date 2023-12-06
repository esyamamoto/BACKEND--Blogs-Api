'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull:false, 
      autoIncrement: true},
    displayName: DataTypes.STRING,
    
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    
    password: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    
    image: {
      type: DataTypes.STRING, 
    },
    }, 
    
    {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    });

  return User;
};