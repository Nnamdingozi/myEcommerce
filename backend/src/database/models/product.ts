
import {
  Model,
  DataTypes,
  Optional,
  Association,
  Sequelize
} from 'sequelize';
import Merchant from './merchant';
import Category from './category';
import OrderItem from './orderitem';
import { Cart } from './cart';

interface ProductAttributes {
  id: number;
  name: string;
  merchant_id: number;
  price: number;
  status: string;
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  image_url?: string;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt' | 'description' | 'image_url'> {}

  class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  declare id: number;
  declare name: string;
  declare merchant_id: number;
  declare price: number;
  declare status: string;
  declare category_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare description?: string;
  declare image_url?: string;

  public static associations: {
    merchproducts: Association<Product, Merchant>;
    category: Association<Product, Category>;
    product: Association<Product, OrderItem>;
    cartproduct: Association<Product, Cart>;
  };

  public static associate(models: any) {
    Product.belongsTo(models.Merchant, {
      foreignKey: 'merchant_id',
      as: 'merchproducts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });


    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: 'product_id',
      as: 'product',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Product.hasMany(models.Cart, {
      foreignKey: 'product_id',
      as: 'cartproduct',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export function initProductModel(sequelize: Sequelize): typeof Product {
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      merchant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'merchants',
          key: 'id',
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );

  return Product;
}

export const init = initProductModel;
export default Product;
