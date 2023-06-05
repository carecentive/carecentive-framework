// Update with your config settings.

var dotenv = require('dotenv');
dotenv.config();

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host:     process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: ['./database/migrations', './node_modules/carecentive-core/database/migrations']
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host:     process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: ['./database/migrations', './node_modules/carecentive-core/database/migrations']
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host:     process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: ['./database/migrations', './node_modules/carecentive-core/database/migrations']
    }
  }

};
