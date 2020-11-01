const express = require('express');
const router = express.Router();
const mysqlConnection = require('../conexion/database')
var md5 = require('md5');


router.post('/setAmigo', (req, res) => {
    var usuario_id = req.body.usuario_id;
    var amigo_id = req.body.amigo_id;
    var estado = 3;
    var query = 'INSERT INTO solicitudes (usuario_id,usuario_amigo_id,status) VALUES ("' + usuario_id + '" , "' + amigo_id + '", ' + estado + ');';
    mysqlConnection.query(query, (error, rows, fields) => {
        if (!error) {
            res.json({
                status: 1,
                info: "Solicitud enviada correctamente"
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

router.post('/getSolicitudes', (req, res) => {
    var usuario_id = req.body.usuario_id
    var query = `
    SELECT  usuarios.* FROM solicitudes 
    INNER JOIN usuarios ON solicitudes.usuario_amigo_id = usuarios.id
    WHERE status = 3 AND usuario_id = `+ usuario_id;
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
});
router.post('/getCheckSolicitud', (req, res) => {
    var usuario_id = req.body.usuario_id
    var amigo_id = req.body.amigo_id
    var query = `
    SELECT solicitudes_estado.descripcion FROM solicitudes 
    INNER JOIN solicitudes_estado ON solicitudes.status = solicitudes_estado.id
    WHERE usuario_id =`+ usuario_id + ` AND usuario_amigo_id = ` + amigo_id;

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
});

module.exports = router;