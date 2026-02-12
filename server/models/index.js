/* Sequelize models index - loads all models in this directory and initializes associations */
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME || 'biogas_mis',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: (process.env.DB_LOGGING === 'true') ? console.log : false,
    define: { underscored: true },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
    } catch (e) {
      console.warn(`Model associate failed for ${modelName}:`, e && e.message);
      // continue - missing dependent models may cause associations to fail in partial repos
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

