'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Country.hasMany(models.User, {

        foreignKey: 'country_code',
        as: 'user',
        sourceKey: 'code',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Country.hasMany(models.Merchant, {

        foreignKey: 'country_code',
        sourceKey: 'code',
        as: 'merchant',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      
    }
  }
  Country.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent_name: {
      type: DataTypes.STRING
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
    modelName: 'Country',
    tableName: 'countries'
  });
  return Country;
};