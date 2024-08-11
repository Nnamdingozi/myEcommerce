'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        // Create 'countries' table
        await queryInterface.createTable('countries', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },

          code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          country_name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          continent_name: {
            type: Sequelize.STRING
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        }, { transaction });

        // Create 'users' table
        await queryInterface.createTable('users', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,

          },

          username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isNumeric: true,
              len: [10, 15],
              is: /^[0-9]+$/i
            }
          },

          password: {
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
            unique: true,
            allowNull: true
          },
          country_code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
            references: {
              model: 'countries', 
              key: 'code'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        }, { transaction });

        // Create 'orders' table
        await queryInterface.createTable('orders', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          status: {
            type: Sequelize.STRING,
            allowNull: false
          },
          order_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now')
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        }, { transaction });

        // create 'merchants' table
        await queryInterface.createTable('merchants', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          merchant_name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            }
          },

          country_code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
            references: {
              model: 'countries',
              key: 'code'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        }, { transaction });


        // create 'categories' table
        await queryInterface.createTable('categories', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          category_name: {
            type: Sequelize.STRING,
            allowNull: false
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        }, { transaction });

        // Create 'products' table
        await queryInterface.createTable('products', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          merchant_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'merchants',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          price: {
            type: Sequelize.DECIMAL,
            allowNull: false
          },
          status: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'categories',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          }
        }, { transaction });

        // Create 'orderItems' table
        await queryInterface.createTable('orderItems', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'orders',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'products',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1, // Default value if not provided
            validate: {
              min: 1 // Ensure quantity is at least 1
            }
          },
        }, { transaction });


        // Create 'carts' table
        await queryInterface.createTable('carts', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1, // Default value if not provided
            validate: {
              min: 1 // Ensure quantity is at least 1
            }
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'products',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now')

          }

        }, { transaction });






      } catch (error) {
        // If any operation fails, the transaction will be rolled back.
        throw error;
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        // Drop 'carts' table first due to foreign key dependency
        await queryInterface.dropTable('carts', { transaction });

        // Drop 'orderItems' table
        await queryInterface.dropTable('orderItems', { transaction });

        // Drop 'products' table
        await queryInterface.dropTable('products', { transaction });

        // Drop 'categories' table
        await queryInterface.dropTable('categories', { transaction });

        // Drop 'merchants' table
        await queryInterface.dropTable('merchants', { transaction });

        // Drop 'orders' table
        await queryInterface.dropTable('orders', { transaction });

        // Drop 'users' table
        await queryInterface.dropTable('users', { transaction });

        // Drop 'countriess' table
        await queryInterface.dropTable('countries', { transaction });


      } catch (error) {
        // If any operation fails, the transaction will be rolled back.
        throw error;
      }
    });
  }
};
