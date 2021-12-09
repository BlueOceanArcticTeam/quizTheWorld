/* eslint-disable comma-dangle */
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quizKnows',
  password: process.env.PASSWORD,
  port: 5432 // Default port
});

module.exports = pool;
