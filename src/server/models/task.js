'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
     allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    })
  };
  return Task;
};