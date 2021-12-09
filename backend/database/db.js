const { query } = require('express');
const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  async query(``, params) {
    const res = await pool.query(``, params);
    return res;
  }
};
