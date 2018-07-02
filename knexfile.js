// Update with your config settings.
// require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/volunteers_io'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_USE
    // 'postgres://bqalfbsrfgveyv:41f78a9719dea015c7225753f5aabd21f33e807a4911dcd60679b7d39ba3371f@ec2-54-235-196-250.compute-1.amazonaws.com:5432/dbg8f8sgu8ssq8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
