
'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  Association
} from 'sequelize';

// Define attributes for the Merchant model
export interface MerchantAttributes {
  id: number;
  merchant_name: string;
  email: string;
  country_code: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define attributes that are optional when creating a new Merchant record
export interface MerchantCreationAttributes
  extends Optional<MerchantAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Merchant
  extends Model<MerchantAttributes, MerchantCreationAttributes>
  implements MerchantAttributes {
  declare id: number;
  declare merchant_name: string;
  declare email: string;
  declare country_code: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Define associations with proper typing
  static associations: {
    merchant: Association<Merchant, any>;
    merchproducts: Association<Merchant, any>;
  };

  // Define model associations
  static associate(models: any) {
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
    });
  }
}

// Initialize the Merchant model
export function initMerchantModel(sequelize: Sequelize): typeof Merchant {
  Merchant.init(
    {
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
          isEmail: true
        }
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'code'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'Merchant',
      tableName: 'merchants'
    }
  );

  return Merchant;
}
export const init = initMerchantModel
export default Merchant;
