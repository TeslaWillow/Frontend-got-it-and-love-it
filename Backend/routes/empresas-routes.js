'use strict';
let express = require('express');
let router = express.Router();
let Empresa = require('../models/empresas-model');

router.get('/', (req, res) => {
    Empresa.find().exec((err, data) => {
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
    let empresaDB = new Empresa({
        nombre: body.nombre,
        direccion: body.direccion,
        bloqueda: false,
        rubro: body.rubro,
        productos: [],
        bancoArchivos: [],
        imagenes: [],
        paginas: []
    });

    empresaDB.save((err, data) => {
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
            plan: data
        });
    });
});

module.exports = router;