const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: MYSQL_USER,
  // Your MySQL password
  password: MYSQL_PASSWORD,
  database: 'employee-tracker'
});

module.exports = db;