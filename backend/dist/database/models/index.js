"use strict";
// // 'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // const fs = require('fs');
// // const path = require('path');
// // const Sequelize = require('sequelize');
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// // // const swaggerEnv = process.env.SWAGGER_AUTOGEN_NODE_ENV;
// // // const config = require(__dirname + '/../config/config.js')[env];
// // // const db = {};
// // let config;
// // if (env === 'swagger-autogen') {
// //   config = {
// //     url: process.env.DATABASE_URL, 
// //     dialect: 'postgres', 
// //   };
// //   console.log('Config URL:', config.url);
// // console.log('Config Dialect:', config.dialect);
// // } else {
// //   config = require(__dirname + '/../config/config.js')[env];
// // }
// // // Ensure the config has the necessary properties
// // if (!config.url || !config.dialect ) {
// //   throw new Error('Missing database configuration');
// // }
// // const db = {};
// // let sequelize;
// // sequelize = new Sequelize(config.url, {
// //   dialect: config.dialect,
// // });
// // fs
// //   .readdirSync(__dirname)
// //   .filter(file => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach(file => {
// //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// //     if (model && model.name) {
// //       db[model.name] = model;
// //     } else {
// //       console.error(`Model file ${file} did not export a valid model`);
// //     }
// //   });
// // Object.keys(db).forEach(modelName => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });
// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// // module.exports = db;
// // 'use strict';
// // const fs = require('fs');
// // const path = require('path');
// // const Sequelize = require('sequelize');
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// // let config;
// // // Load config based on environment
// // if (env === 'production') {
// //   if (!process.env.DATABASE_URL) {
// //     throw new Error('DATABASE_URL must be set in a production environment');
// //   }
// //   config = {
// //     url: process.env.DATABASE_URL,
// //     dialect: 'postgres',
// //     dialectOptions: {
// //       ssl: {
// //         require: true,
// //         rejectUnauthorized: false // Note: This may vary based on your SSL setup; adjust as needed
// //       }
// //     }
// //   };
// // } else if (env === 'swagger-autogen') {
// //   config = {
// //     url: process.env.DATABASE_URL,
// //     dialect: 'postgres',
// //   };
// //   console.log('Using Swagger Autogen Config');
// //   console.log('Config URL:', config.url);
// //   console.log('Config Dialect:', config.dialect);
// // } else {
// //   config = require(__dirname + '/../config/config.js')[env];
// // }
// // // Ensure the config has the necessary properties
// // if (!config.url || !config.dialect) {
// //   throw new Error('Missing database configuration');
// // }
// // const db = {};
// // let sequelize = new Sequelize(config.url, config);
// // fs
// //   .readdirSync(__dirname)
// //   .filter(file => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach(file => {
// //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// //     if (model && model.name) {
// //       db[model.name] = model;
// //     } else {
// //       console.error(`Model file ${file} did not export a valid model`);
// //     }
// //   });
// // Object.keys(db).forEach(modelName => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });
// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// // module.exports = db;
// // import * as fs from 'fs';
// // import * as path from 'path';
// // import { Sequelize } from 'sequelize';
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// // let config: { url?: string; dialect?: string; [key: string]: any };
// // if (env === 'production') {
// //   if (!process.env.DATABASE_URL) {
// //     throw new Error('DATABASE_URL must be set in a production environment');
// //   }
// //   config = {
// //     url: process.env.DATABASE_URL,
// //     dialect: 'postgres',
// //     dialectOptions: {
// //       ssl: {
// //         require: true,
// //         rejectUnauthorized: false // Adjust as needed for your SSL setup
// //       }
// //     }
// //   };
// // } else if (env === 'swagger-autogen') {
// //   config = {
// //     url: process.env.DATABASE_URL,
// //     dialect: 'postgres'
// //   };
// //   console.log('Using Swagger Autogen Config');
// //   console.log('Config URL:', config.url);
// //   console.log('Config Dialect:', config.dialect);
// // } else {
// //   // Adjust the relative path as needed.
// //   config = require(path.join(__dirname, '/../config/config.js'))[env];
// // }
// // if (!config.url || !config.dialect) {
// //   throw new Error('Missing database configuration');
// // }
// // const db: Record<string, any> = {};
// // const sequelize = new Sequelize(config.url, config);
// // // Read all model files in the current directory (excluding index.ts/js)
// // fs.readdirSync(__dirname)
// //   .filter((file) => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach((file) => {
// //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// //     if (model && model.name) {
// //       db[model.name] = model;
// //     } else {
// //       console.error(`Model file ${file} did not export a valid model`);
// //     }
// //   });
// // // Setup associations if defined in the models
// // Object.keys(db).forEach((modelName) => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });
// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// // export default db;
// // import { Sequelize } from 'sequelize';
// // import databaseConfig from '../config/config';
// // import { initCartModel } from './cart';
// // import { initCategoryModel } from './category';
// // import { initCountryModel } from './country';
// // import { initMerchantModel } from './merchant';
// // import { initOrderModel } from './order';
// // import { initOrderItemModel } from './orderitem';
// // import { initProductModel } from './product';
// // import { initUserModel } from './user';
// // const env = (process.env.NODE_ENV as keyof typeof databaseConfig) || 'development';
// // const config = databaseConfig[env];
// // if (!config.url || !config.dialect) {
// //   throw new Error('Missing database configuration');
// // }
// // const sequelize = new Sequelize(config.url as string, config);
// // // Define Database Interface
// // interface Database {
// //   Cart: ReturnType<typeof initCartModel>;
// //   Category: ReturnType<typeof initCategoryModel>;
// //   Country: ReturnType<typeof initCountryModel>;
// //   Merchant: ReturnType<typeof initMerchantModel>;
// //   Order: ReturnType<typeof initOrderModel>;
// //   OrderItem: ReturnType<typeof initOrderItemModel>;
// //   Product: ReturnType<typeof initProductModel>;
// //   User: ReturnType<typeof initUserModel>;
// //   sequelize: Sequelize;
// //   Sequelize: typeof Sequelize;
// // }
// // // Initialize models
// // const db = {} as Database;
// // db.Cart = initCartModel(sequelize);
// // db.Category = initCategoryModel(sequelize);
// // db.Country = initCountryModel(sequelize);
// // db.Merchant = initMerchantModel(sequelize);
// // db.Order = initOrderModel(sequelize);
// // db.OrderItem = initOrderItemModel(sequelize);
// // db.Product = initProductModel(sequelize);
// // db.User = initUserModel(sequelize);
// // // Assign sequelize properties
// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// // // Setup associations
// // if (db.User.associate) db.User.associate(db);
// // if (db.Merchant.associate) db.Merchant.associate(db);
// // if (db.Category.associate) db.Category.associate(db);
// // if (db.Product.associate) db.Product.associate(db);
// // if (db.Cart.associate) db.Cart.associate(db);
// // if (db.Order.associate) db.Order.associate(db);
// // if (db.OrderItem.associate) db.OrderItem.associate(db);
// // export default db;
// import { Sequelize } from 'sequelize';
// import config from '../config/config';
// const env = (process.env.NODE_ENV || 'development') as keyof typeof config;
// const dbConfig = config[env]; // dbConfig is of type DBConfig
// if (!dbConfig.database || !dbConfig.username || !dbConfig.dialect) {
//   throw new Error('Missing required database configuration');
// }
// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password ?? undefined, // fix for `null` password
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//     logging: false, // optional
//   }
// );
// import fs from 'fs';
// import path from 'path';
// import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
// import config from '../config/config'; // Importing your config
// import { DBConfig } from '../config/config'; // Make sure DBConfig is the right type
// const env = (process.env.NODE_ENV || 'development') as keyof typeof config;
// const dbConfig = config[env]; // dbConfig is of type DBConfig
// if (!dbConfig.database || !dbConfig.username || !dbConfig.dialect) {
//   throw new Error('Missing required database configuration');
// }
// // Initialize Sequelize with the configuration
// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password ?? undefined, // nullish coalescing to handle `null` password
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//     logging: false, // Optional: you can enable logging if necessary
//   }
// );
// // Dynamically load models from the "models" directory
// const basename = path.basename(__filename);
// const db: { [key: string]: Model<any, any> } = {}; // Defining the type for the db object
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && // Avoid hidden files like .git
//       file !== basename && // Don't include the current index.ts file
//       file.slice(-3) === '.ts' && // Only include TypeScript files
//       file.indexOf('.test.ts') === -1 // Exclude test files
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file)).default; // Import model
//     db[model.name] = model.init(sequelize, DataTypes); // Initialize and add model to the db object
//   });
// // Set up associations if models have associate methods
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// export default db;
// import fs from 'fs';
// import path from 'path';
// import { Sequelize, DataTypes } from 'sequelize';
// import config from '../config/config';
// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];
// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password ?? undefined, {
//   host: dbConfig.host,
//   dialect: dbConfig.dialect,
// });
// const db: any = {};
// // Dynamically import models
// fs.readdirSync(__dirname)
//   .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file)).default;
//     db[model.name] = model.init(sequelize, DataTypes);
//   });
// // Associate models
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// export default db;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config/config"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = config_1.default[env];
// Initialize Sequelize
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password ?? undefined, {
    host: config.host,
    dialect: config.dialect,
    logging: false, // Optional: disable logging
});
// Collect all models
const db = {};
// Dynamically import models
fs_1.default.readdirSync(__dirname)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file)).default;
    db[model.name] = model.init(sequelize, sequelize_1.DataTypes);
});
// Associate models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
