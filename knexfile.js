// Update with your config settings.
// require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/volunteers_io'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_USE
    }
};
