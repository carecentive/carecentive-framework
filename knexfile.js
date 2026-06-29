require('dotenv').config();

const buildKnexConfig = require('./database/config');

const migrations = {
  tableName: 'knex_migrations',
  directory: [
    './database/migrations',
    './node_modules/@carecentive/carecentive-core/database/migrations',
  ],
};

const config = { ...buildKnexConfig(), migrations };

module.exports = {
  development: config,
  staging: config,
  production: config,
};
