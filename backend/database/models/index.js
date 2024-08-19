

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const swaggerEnv = process.env.SWAGGER_AUTOGEN_NODE_ENV;
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

let config;
if (env === 'swagger-autogen') {
  config = {
    url: process.env.DATABASE_URL, 
    dialect: 'postgres', 
  };
  console.log('Config URL:', config.url);
console.log('Config Dialect:', config.dialect);
  
} else {
  config = require(__dirname + '/../config/config.js')[env];
}


// Ensure the config has the necessary properties

if (!config.url || !config.dialect ) {
  throw new Error('Missing database configuration');
}
const db = {};

let sequelize;
sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    if (model && model.name) {
      db[model.name] = model;
    } else {
      console.error(`Model file ${file} did not export a valid model`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;




