

// import fs from 'fs';
// import path from 'path';
// import { Sequelize, Dialect } from 'sequelize';
// import type { DBConfig } from '../../config/config';
// import databaseConfig from '../../config/config';

// const basename = path.basename(__filename);
// const env = (process.env.NODE_ENV as keyof typeof databaseConfig) || 'development';

// let sequelize: Sequelize;

// if (env === 'production' && process.env.DATABASE_URL) {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres' as Dialect,
//     protocol: 'postgres',
//     logging: false,
//   });
// } else {
//   const config: DBConfig = databaseConfig[env];

//   if (!config.database || !config.username || !config.host) {
//     throw new Error(`❌ Missing database configuration for env: ${env}`);
//   }

//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password ?? undefined,
//     {
//       host: config.host,
//       dialect: config.dialect as Dialect,
//       logging: false,
//     }
//   );
// }

// const db: Record<string, any> = {};

// const modelFiles = fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file !== basename &&
//       !file.endsWith('.d.ts') &&
//       (file.endsWith('.ts') || file.endsWith('.js'))
//     );
//   });

// console.log('Model files found:', modelFiles);

// modelFiles.forEach((file) => {
//   const modelModule = require(path.join(__dirname, file));
//   const initModel = modelModule.init as (sequelize: Sequelize) => typeof modelModule.default;

//   if (typeof initModel === 'function') {
//     const model = initModel(sequelize);
//     db[model.name] = model;
//   } else {
//     console.warn(`⚠️ Skipping ${file}: no init() function found`);
//   }
// });

// Object.values(db).forEach((model: any) => {
//   if (typeof model.associate === 'function') {
//     model.associate(db);
//     console.log(`🔗 Associated model: ${model.name}`);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;


// import fs from 'fs';
// import path from 'path';
// import { Sequelize, Dialect, Model } from 'sequelize'; // Or 'sequelize-typescript' if using sequelize-typescript
// import { DBConfigs } from '../../config/config';
// import databaseConfig from '../../config/config';

// const basename = path.basename(__filename);
// const env = (process.env.NODE_ENV as keyof typeof databaseConfig) || 'development';

// let sequelize: Sequelize;

// if (env === 'production' && process.env.DATABASE_URL) {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres' as Dialect,
//     protocol: 'postgres',
//     logging: false,
//   });
// } else {
//   const config: DBConfigs = databaseConfig[env];

//   if (!config.database || !config.username || !config.host) {
//     throw new Error(`❌ Missing database configuration for env: ${env}`);
//   }

//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password ?? undefined,
//     {
//       host: config.host,
//       dialect: config.dialect as Dialect,
//       logging: false,
//     }
//   );
// }

// // Define the db object which will hold all models
// const db: any = {};
// const models: any[] = []; // Array to store model classes
// // Use `typeof Model` to indicate this is a model class

// // Read all model files and initialize them
// const modelFiles = fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file !== basename &&
//       !file.endsWith('.d.ts') &&
//       (file.endsWith('.ts') || file.endsWith('.js'))
//     );
//   });

// console.log('Model files found:', modelFiles);

// // Dynamically import and initialize models
// modelFiles.forEach((file) => {
//   const modelModule = require(path.join(__dirname, file));

//   if (typeof modelModule.init === 'function') {
//     const model = modelModule.init(sequelize);
//     db[model.name] = model;
//     models.push(model); // Add model class to models array
//   } else {
//     console.warn(`⚠️ Skipping ${file}: no init() function found`);
//   }
// });


// // Associate models if the associate method exists
// Object.values(db).forEach((model: any) => {
//   if (typeof model.associate === 'function') {
//     model.associate(db);
//     console.log(`🔗 Associated model: ${model.name}`);
//   }
// });

// // Attach Sequelize and Sequelize constructor to db object
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Export the models
// export default db;

import fs from 'fs';
import path from 'path';
import { Sequelize, Dialect } from 'sequelize';
import { DBConfigs } from '../../config/config';  // Import the DBConfigs interface
import databaseConfig from '../../config/config';  // Import the full config

// Get the base filename of the current file
const basename = path.basename(__filename);
const env = (process.env.NODE_ENV as keyof DBConfigs) || 'development';  // Determine the environment

let sequelize: Sequelize;

if (env === 'production') {
  // In production, use DATABASE_URL from the environment variable
  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres' as Dialect,
      protocol: 'postgres',
      logging: false,
    });
  } else {
    throw new Error('❌ Missing DATABASE_URL environment variable in production.');
  }
} else {
  // In other environments (development, swagger-autogen), use the corresponding config
  const config: DBConfigs[typeof env] = databaseConfig[env];

  // Check that the necessary fields are provided for the environment
  if (!config.database || !config.username || !config.host) {
    throw new Error(`❌ Missing database configuration for env: ${env}`);
  }

  // Initialize Sequelize with the environment-specific configuration
  sequelize = new Sequelize(config.database, config.username, config.password ?? undefined, {
    host: config.host,
    dialect: config.dialect as Dialect,
    logging: false,
  });
}

// Initialize the db object to hold all models
const db: any = {};
const models: any[] = [];  // Array to store model classes

// Read all model files and initialize them dynamically
const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename && (file.endsWith('.ts') || file.endsWith('.js')));

console.log('Model files found:', modelFiles);

// Dynamically import and initialize models
modelFiles.forEach((file) => {
  const modelModule = require(path.join(__dirname, file));

  if (typeof modelModule.init === 'function') {
    const model = modelModule.init(sequelize);
    db[model.name] = model;
    models.push(model);  // Add model to the array
  } else {
    console.warn(`⚠️ Skipping ${file}: no init() function found`);
  }
});

// Establish associations if the associate method exists
Object.values(db).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
    console.log(`🔗 Associated model: ${model.name}`);
  }
});

// Attach Sequelize and Sequelize constructor to db object for use elsewhere
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object containing models and Sequelize instance
export default db;
