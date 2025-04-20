
import fs from 'fs';
import path from 'path';
import { Sequelize, Dialect } from 'sequelize';
import databaseConfig, { DBConfig } from '../../config/config';

const basename = path.basename(__filename);
const env = (process.env.NODE_ENV as keyof typeof databaseConfig) || 'development';
const config: DBConfig = databaseConfig[env];

const sequelize = new Sequelize(
  config.database, config.username, config.password ?? undefined,
  { host: config.host, dialect: config.dialect as Dialect, logging: false }
);

const db: Record<string, any> = {};

const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => {
    if (file === basename || file.endsWith('.d.ts')) return false;
    return file.endsWith('.ts') || file.endsWith('.js');
  });

console.log('Model files found:', modelFiles);

modelFiles.forEach((file) => {
  const modelModule = require(path.join(__dirname, file));


  const initModel = modelModule.init as (sequelize: Sequelize) => typeof modelModule.default;
  if (typeof initModel === 'function') {
    const model = initModel(sequelize);
    db[model.name] = model;
  
  } else {
    console.warn(`⚠️ Skipping ${file}: no init()`);
  }
});

Object.values(db).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
    console.log(`🔗 Associated model: ${model.name}`);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
