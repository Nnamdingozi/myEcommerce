'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.User = void 0;
exports.initUserModel = initUserModel;
const sequelize_1 = require("sequelize");
// Define the User model class using TypeScript
class User extends sequelize_1.Model {
    // Declare associations for better type-checking and autocomplete support.
    static associations;
    // Define associations with other models using their full type
    static associate(models) {
        User.hasMany(models.Order, {
            foreignKey: 'user_id',
            as: 'orders',
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
exports.User = User;
// Initialize the User model
function initUserModel(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 15],
                is: /^[0-9]+$/i
            }
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
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
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        country_code: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
            references: {
                model: 'countries',
                key: 'code'
            }
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    });
    return User;
}
exports.init = initUserModel;
exports.default = User;
