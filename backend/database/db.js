/* eslint-disable comma-dangle */
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'quizKnows',
  password: '',
  port: 5432 // Default port
});

module.exports = pool;
