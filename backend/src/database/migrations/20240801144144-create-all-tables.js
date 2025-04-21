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
                const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
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
          total_amount: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
          },
          payment_status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'unpaid'
          },
          payment_method: {
            type: Sequelize.STRING,
            allowNull: true
          },
          shipping_address: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          shipping_method: {
            type: Sequelize.STRING,
            allowNull: true
          },
          tracking_number: {
            type: Sequelize.STRING,
            allowNull: true
          },
          currency: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'NGN'
          },
          transaction_reference: {
            type: Sequelize.STRING,
            allowNull: true
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


        await queryInterface.createTable('merchants', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          merchant_name: {
            type: Sequelize.STRING,
            allowNull: false,
         
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          country_code: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: 'countries',
              key: 'code'
            }
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

            // Create 'orders' table
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
                  key: 'id',
                },
              },
              price: {
                type: Sequelize.DECIMAL,
                allowNull: false,
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
                  key: 'id',
                },
              },

              description: {
                type: Sequelize.TEXT,
                allowNull: true,
              },
              image_url: {
                type: Sequelize.STRING,
                allowNull: true,
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
              },

            }, { transaction });

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
                }
              },
              product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'products',
                  key: 'id'
                }
              },
              quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                  min: 1
                }
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
                defaultValue: 1,
                validate: {
                  min: 1,
                },
              },
              user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'id',
                },
              },
              product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'products',
                  key: 'id',
                },
              },
              total: {
                type: Sequelize.DECIMAL,
                allowNull: false,
                defaultValue: 0,
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
    




        // Additional tables (merchants, categories, products, orderItems, carts) are created similarly...
      } catch (error) {
        throw error;
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.dropTable('carts', { transaction });
        await queryInterface.dropTable('orderItems', { transaction });
        await queryInterface.dropTable('products', { transaction });
        await queryInterface.dropTable('categories', { transaction });
        await queryInterface.dropTable('merchants', { transaction });
        await queryInterface.dropTable('orders', { transaction });
        await queryInterface.dropTable('users', { transaction });
        await queryInterface.dropTable('countries', { transaction });
      } catch (error) {
        throw error;
      }
    });
  }
};
