/** Connecting database postgresql with lib knex  */

const knex = require('knex');

const getConnection = () => knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

module.exports = {
  getConnection: getConnection
}