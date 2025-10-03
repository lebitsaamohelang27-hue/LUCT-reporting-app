// database.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'luct_reporting',
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message || err);
    return;
  }
  console.log('MySQL connected for project: LUCT-reporting app');
});

module.exports = db;
