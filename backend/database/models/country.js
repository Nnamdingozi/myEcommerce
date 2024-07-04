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
      // define association here
      Country.hasMany(models.Merchant, {
        foreignKey: 'coutry_code',
        sourceKey: 'code',
        as: 'merchants'
      });

      Country.hasMany(models.User, {
        foreignKey: 'coutry_code',
        sourceKey: 'code',
        as: 'users'
      })
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
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    country_name: DataTypes.STRING,
    continent_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};