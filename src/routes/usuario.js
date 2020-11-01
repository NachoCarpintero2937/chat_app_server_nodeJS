const express = require('express');
const router = express.Router();
const mysqlConnection = require('../conexion/database');

// BUSCAR USUARIO
router.post('/getSearchUser', (req, res) => {
    var filtros = req.body.filtro
    if (filtros.usuario) {
        var query = 'SELECT * FROM usuarios WHERE   id NOT IN(' + filtros.usuario_id + ') AND nombre LIKE "' + filtros.usuario + '%" OR apellido LIKE "' + filtros.usuario + '%"';
        console.log(query)
        mysqlConnection.query(query, (error, rows, fields) => {
            if (!error) {
                return res.status(200).json({
                    health: true,
                    status: 1,
                    info: "Obtensión exitosa",
                    datos: rows
                });
            } else {
                return res.status(500).json(
                    {
                        health: false,
                        status: 2,
                        info: "Error interno en el servidor"
                    });
            }
        });
    } else {
        return res.status(200).json({
            health: true,
            status: 1,
            info: "Obtensión exitosa",
            datos: []
        });
    }
});
// CREAR USUARIO
router.post('/setUsuario', (req, res) => {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var usuario = req.body.usuario;
    var email = req.body.email;
    var password = req.body.password;
    var estado = 1;
    var query = 'INSERT INTO usuarios (nombre,apellido,usuario,email,password,estado) VALUES ("' + nombre + '","' + apellido + '","' + usuario + '","' + email + '","' + password + '","' + estado + '"' + ');';
    mysqlConnection.query(query, (error, rows, fields) => {
        if (!error) {
            res.json({
                status: 1,
                info: "Usuario registrado correctamente"
            });
        } else {
            res.json({
                status: 1,
                info: "Hubo un error en el registro"
            });
            return res.status(200).json(
                {
                    health: false,
                    status: 1,
                    info: "Hubo un error en el registro"
                });
        }
    });
});
// GET USER ID
router.post('/getUserId', (req, res) => {
    var id = req.body.id;
    var query = 'SELECT * FROM usuarios WHERE id=' + id;
    mysqlConnection.query(query, (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});
module.exports = router;