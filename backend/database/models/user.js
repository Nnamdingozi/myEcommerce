'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: 'user_id',
        as: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      User.belongsTo(models.Country, {
        foreignKey: country_code,
        targetKey: 'code',
        as: 'country'
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
        type: DataTypes.STRING(5),
        allowNull: true,
        validate: {
          is: /^\+\d{1,4}$/ // Ensures the country code format starts with '+' and is followed by digits
        },
        references: {
          model: 'Countries',
          key: 'code'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

    },
    sequelize,
    modelName: 'User',
  });
  return User;
};