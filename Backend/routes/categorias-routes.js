'use strict';
let express = require('express');
let router = express.Router();
const _ = require("underscore");
let Categoria = require('../models/categorias-model');
//Obtener todas las categorias
router.get('/', (req, res) => {
    Categoria.find().exec((err, data) => {
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
//Crear una categoria
router.post('/', (req, res) => {
    const body = _.pick(req.body, ["nombre", "descripcion"]);
    let categoriaDB = new Categoria(body);
    categoriaDB.save((err, data) => {
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
//Actualizar una categoria
router.put('/:id', (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ["nombre", "descripcion"]);
    Categoria.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, data) => {
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