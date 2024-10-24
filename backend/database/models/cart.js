'use strict';


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {

        foreignKey: 'user_id',
        as: 'cart',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Cart.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'cartproduct',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


    }
  }

  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Default value if not provided
      validate: {
        min: 1 // Ensure quantity is at least 1
      }
    },



    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }

    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
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
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0

    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    hooks: {

      //calculates total before creating a cart item
      async beforeCreate(cart, options) {
        console.log('Before Create Hook Triggered');
        try {
          const product = await sequelize.models.Product.findByPk(cart.product_id, { transaction: options.transaction });
          if (product) {
            cart.total = product.price * cart.quantity;
            console.log(`Calculated Total: ${cart.total}`);
          } else {
            throw new Error(`Product with id ${cart.product_id} not found`)
          }
        } catch (err) {
          console.error('Error in beforeCreate hook', err)
        }
      }
      ,

      async beforeUpdate(cart, options) {
        console.log('Before update Hook Triggered');
        try {
          const product = await sequelize.models.Product.findByPk(cart.product_id, { transaction: options.transaction });

          if (product) {
            cart.total = product.price * cart.quantity;
            console.log(`updated Total: ${cart.total}`);
          } else {
            throw new Error(`Product with id ${cart.product_id} not found`)
          }
        } catch (err) {
          console.error('Error in beforeCreate hook', err);
        }


      }

    }


    //calculates total before updating a cart item

  });

  return Cart;
};















