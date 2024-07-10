'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Merchant.belongsTo(models.Country, {
        foreignKey: 'country_code',
        targetKey: 'code',
        as: 'country'
      });
      Merchant.hasMany(models.Product, {
        foreignKey: 'merchant_id',
        as: 'products'
    
      })
    }
  }
  Merchant.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    merchant_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },

    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'code'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};