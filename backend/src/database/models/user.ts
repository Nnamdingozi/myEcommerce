
// 'use strict';
// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   class User extends Model {
//     static associate(models) {
//       // define association here
//       User.hasMany(models.Order, {

//         foreignKey: 'user_id',
//         as: 'userorders',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });

//       User.hasMany(models.Cart, {

//         foreignKey: 'user_id',
//         as: 'cart',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });

//       User.belongsTo(models.Country, {
//         foreignKey: 'country_code',
//         as: 'user',
//         targetKey: 'code',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }

//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isNumeric: true,
//         len: [10, 15],
//         is: /^[0-9]+$/i
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [8, 100],
//         isComplex(value) {
//           const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
//           if (!complexityRegex.test(value)) {
//             throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
//           }
//         }
//       }
//     },
//     githubId: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: true
//     },
//     country_code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: false,
//       references: {
//         model: 'countries',
//         key: 'code' 
//       }
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: sequelize.NOW
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: sequelize.NOW
//     }
//   }, {
//     sequelize,
//     modelName: 'User',
//     tableName: 'users'
//   });

//   return User;
// };








'use strict';

import { Model, DataTypes, Optional, Sequelize, Association } from 'sequelize';
import Order from './order';
import Cart from './cart';
import Country from './country';

// Define the attributes for the User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  githubId?: string | null;
  country_code: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the attributes that are optional when creating a new User record
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'githubId' | 'createdAt' | 'updatedAt'> {}

// Define the User model class using TypeScript
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare githubId?: string | null;
  declare country_code: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Declare associations for better type-checking and autocomplete support.
  // Here we use the full types of the associated models.
  static associations: {
    orders: Association<User, Order>;
    cart: Association<User, Cart>;
    country: Association<User, Country>;
  };

  // Define associations with other models using their full type
  static associate(models: { Order: typeof Order; Cart: typeof Cart; Country: typeof Country }) {
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
      as: 'orders', // using "orders" as alias instead of "userorders" for uniformity
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
      as: 'country',
      targetKey: 'code',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
}

// Initialize the User model
export function initUserModel(sequelize: Sequelize): typeof User {
  User.init(
    {
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
          isComplex(value: string) {
            const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
            if (!complexityRegex.test(value)) {
              throw new Error(
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
              );
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
      modelName: 'User',
      tableName: 'users'
    }
  );

  return User;
}
export const init = initUserModel;
export default User;
