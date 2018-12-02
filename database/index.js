const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'student',
    database: 'goaltracker',
});

connection.connect();

module.exports = connection;