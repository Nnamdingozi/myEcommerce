
'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {

        foreignKey: 'user_id',
        as: 'userorders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      User.hasMany(models.Cart, {

        foreignKey: 'user_id',
        as: 'cart',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      User.belongsTo(models.Country, {
        foreignKey: 'country_code',
        as: 'user',
        targetKey: 'code',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10, 15],
        is: /^[0-9]+$/i
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
        isComplex(value) {
          const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
          if (!complexityRegex.test(value)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
          }
        }
      }
    },
    githubId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      references: {
        model: 'countries',
        key: 'code' 
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;
};
