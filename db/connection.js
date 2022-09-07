const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: process.env.MYSQL_USER,
  // Your MySQL password
  password: process.env.MYSQL_PASSWORD,
  database: 'employee-tracker'
},
 console.log("You're now connected to the employee-tracker database!")
);

module.exports = db;