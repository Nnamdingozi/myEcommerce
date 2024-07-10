// test.js

// Import built-in modules (no need to install)
const fs = require('fs');
const path = require('path');

// Import Sequelize (must be installed via npm)
const Sequelize = require('sequelize');

// Test fs module
fs.readdir('.', (err, files) => {
  if (err) throw err;
  console.log('fs module works:', files);
});

// Test path module
const basePath = path.basename(__filename);
console.log('path module works:', basePath);

// Test Sequelize module
const sequelize = new Sequelize('postgres://Ngozi:postgres@0.0.0.0:5432/postgres'); // using SQLite for a quick test

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize module works: Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Sequelize module error:', err);
  });
