const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'chatapp'
});

mysqlConnection.connect(function (err) {
    if (err)
        console.log('ERROR DE CONEXION  A DB');
    else
        console.log('Db is running');
});

module.exports = mysqlConnection;