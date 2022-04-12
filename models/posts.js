const sequelize = require('../config/config');
const { Model, DataTypes } = require('sequelize');


module.exports = function (sequelize, DataTypes) {
  const Posts = sequelize.define('Posts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Posts.associate = function (models) {
    Posts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Posts;
};
