require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'raghul',
    password: process.env.DB_PASS || 'RefexAdmin@123',
    database: process.env.DB_NAME || 'biogas_mis',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false
  },
  test: {
    username: process.env.DB_USER || 'raghul',
    password: process.env.DB_PASS || 'RefexAdmin@123',
    database: process.env.DB_NAME || 'biogas_mis',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER || 'raghul',
    password: process.env.DB_PASS || process.env.DB_PASSWORD || 'RefexAdmin@123',
    database: process.env.DB_NAME || 'biogas_mis',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false
  }
};

