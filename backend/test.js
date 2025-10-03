// test.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '29112023',
  database: 'luct_reporting'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }
  console.log('MySQL connected for project: LUCT-reporting app (test)');
  db.end();
});
