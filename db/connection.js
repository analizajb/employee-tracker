const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Ru$hed1995Ok',
  database: 'company'
});

// Actually connects. If error, shows error
db.connect(function(error) {
    if (error) throw error;
    promptUser();
});

module.exports = db;