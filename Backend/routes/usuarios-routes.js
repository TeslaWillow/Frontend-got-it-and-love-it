'use strict';
const Mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const _ = require("underscore");
let Usuario = require('../models/usuarios-model');
//obtener usuarios
router.get('/', (req, res) => {
    Usuario.aggregate([{
            $lookup: {
                from: 'tipoUsuario',
                localField: 'tipoUsuario',
                foreignField: '_id',
                as: 'tipoUsuario'
            }
        }, {
            $lookup: {
                from: 'planes',
                localField: 'plan',
                foreignField: '_id',
                as: 'plan'
            }
        }])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

//obtener usuario
router.get('/:id', (req, res) => {
    let id = Mongoose.Types.ObjectId(req.params.id);
    Usuario.aggregate([{ "$match": { _id: id } }, {
            $lookup: {
                from: 'tipoUsuario',
                localField: 'tipoUsuario',
                foreignField: '_id',
                as: 'tipoUsuario'
            }
        }, {
            $lookup: {
                from: 'planes',
                localField: 'plan',
                foreignField: '_id',
                as: 'plan'
            }
        }])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

//crear usuario
router.post('/', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        password: bcrypt.hashSync(body.password, 10)
    });
    usuario.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).json({
                mensaje: "Ocurrio un problema al crear al usuario",
                err: err
            });
        });
});

router.put('/:id', (req, res) => {
    let body = _.pick(req.body, [
        "nombre", "apellido",
        "telefono", "foto",
        "activo", "tipoUsuario",
        "plan", "compras",
        "empresa"
    ]); //El underscore solo permite actualizar los campos dentro del arreglo que hagan match con el schema
    Usuario.findByIdAndUpdate({ _id: req.params.id }, body, { new: true, runValidators: true })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).json({
                mensaje: "Ocurrio un problema al actualizar al usuario",
                err: err
            });
        });
});

router.delete('/:id', (req, res) => {
    let body = req.body;
    res.send("delete FUNCIONA");
});

module.exports = router;