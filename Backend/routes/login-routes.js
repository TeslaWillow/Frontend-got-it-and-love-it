'use strict';
const config = require('../controller/config');
let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Usuario = require('../models/usuarios-model');
let TipoUsuario = require('../models/tipousuario-model');

router.post('/', (req, res) => {
    let body = req.body;
    Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "error en el servidor",
                err
            });
        };
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        };
        //Aquí compara las contraseñas(Encriptacion de una sola via)
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        };

        TipoUsuario.findById(usuarioDB.tipoUsuario, (err, tipoUsuarioDB) => {
            if (!tipoUsuarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Su tipo de usuario no existe"
                });
            }

            const token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); //Expira en 1 mes

            res.status(200).json({
                ok: true,
                nombre: usuarioDB.nombre,
                apellido: usuarioDB.apellido,
                correo: usuarioDB.correo,
                plan: usuarioDB.plan,
                tipo: usuarioDB.tipoUsuario,
                foto: usuarioDB.foto,
                tipoUsuario: tipoUsuarioDB.tipo,
                token
            });
        });
    });
});

module.exports = router;