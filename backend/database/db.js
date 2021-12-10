/* eslint-disable comma-dangle */
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USERNAME,
  host: 'localhost',
  database: 'quizknows',
  password: process.env.PASSWORD,
  port: 5432 // Default port
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to PostgresQL');
  }
});

module.exports = pool;
