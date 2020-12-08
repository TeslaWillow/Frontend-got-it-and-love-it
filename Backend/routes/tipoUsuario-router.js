'use strict';
let express = require('express');
let router = express.Router();
let tipoUsuario = require('../models/tipousuario-model');

router.get('/', (req, res) => {
    tipoUsuario.find().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

router.post('/', (req, res) => {
    let body = req.body;
    let tipoUsuarioDB = new tipoUsuario({
        tipo: body.tipo,
        descripcion: body.descripcion
    });
    tipoUsuarioDB.save((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

module.exports = router;