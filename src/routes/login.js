const express = require('express');
const router = express.Router();
const mysqlConnection = require('../conexion/database');

router.post('/login', (req, res) => {
    var username = req.body.username;
    var pasword = req.body.password
    var query = 'SELECT * FROM usuarios WHERE usuario="' + username + '" AND password ="' + pasword + '"';
    mysqlConnection.query(query, (error, rows, fields) => {
        if (!error) {
            if (rows[0]) {
                return res.status(200).json({
                    health: true,
                    status: 1,
                    info: "Usuario logueado",
                    datos: rows
                });
            } else {
                return res.status(401).json(
                    {
                        health: false,
                        status: 1,
                        info: "Datos incorrectos"
                    });
            }
        } else {
            return res.status(500).json(
                {
                    health: false,
                    status: 2,
                    info: "Error interno"
                });
        }
    });
});
module.exports = router;