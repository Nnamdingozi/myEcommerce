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
        as: 'merchant',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    
      });
      Merchant.hasMany(models.Product, {
        foreignKey: 'merchant_id',
        as: 'merchproducts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

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
    merchant_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    },
  }, {
    sequelize,
    modelName: 'Merchant',
    tableName: 'merchants'
  });
  return Merchant;
};