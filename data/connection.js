/** Connecting database postgresql with lib knex  */

const knex = require('knex');

const getConnection = () => knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'tgmarinho',
    password: '',
    database: 'smart-brain'
  }
});

module.exports = {
  getConnection: getConnection
}