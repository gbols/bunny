export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
     type: DataTypes.STRING,
     allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
     },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
     },
     password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 6
      }
    },
    role: {
      type: DataTypes.ENUM(['standard', 'admin']),
      allowNull: false,
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks'
    })
  };
  return User;
};