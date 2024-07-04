'use strict';
const {
  Model
} = require('sequelize');
const orderitem = require('./orderitem');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Merchant, {
        foreignKey: 'merchant_id',
        as: 'merchant'
      })

      Product.hasMany(models.OrderItem, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    merchant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};