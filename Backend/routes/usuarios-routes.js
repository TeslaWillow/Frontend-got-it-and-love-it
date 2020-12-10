'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/imagenes/usuarios';
let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const _ = require("underscore");
let Usuario = require('../models/usuarios-model');

const { verificaToken } = require('../middleware/auth-middleware');
const { guardarAvatar } = require('../middleware/avatar-middleware');
//obtener usuarios
router.get('/', verificaToken, (req, res) => {
    Usuario.aggregate([{
            $lookup: {
                from: 'tipousuarios',
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
            res.status(200).json({
                ok: true,
                data
            });
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

//obtener usuario
router.get('/:id', verificaToken, (req, res) => {
    const id = Mongoose.Types.ObjectId(req.params.id);
    Usuario.aggregate([{ "$match": { _id: id } }, {
            $lookup: {
                from: 'tipousuarios',
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
            res.status(200).json({
                ok: true,
                data
            });
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                err
            });
        });
});

//crear usuario
router.post('/', (req, res) => {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const _body = _.pick(body, [
        "nombre", "apellido",
        "password", "correo",
        "telefono",
        "activo", "tipoUsuario",
        "plan"
    ]);
    let usuario = new Usuario(_body);
    usuario.save()
        .then(data => {
            res.status(200).json({
                ok: true,
                data
            });
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                mensaje: "Ocurrio un problema al crear al usuario",
                err: err
            });
        });
});

router.put('/:id', verificaToken, guardarAvatar, (req, res) => {
    const _id = req.params.id;
    if (req.file && req.file.originalname != "") {
        const nombreArchivo = req.file.originalname;
        const rutaArchivo = `${URL}/${folderImages}/${_id}/${nombreArchivo}`;
        req.body.foto = rutaArchivo;
    }
    let body = _.pick(req.body, [
        "nombre", "apellido",
        "telefono", "foto",
        "activo", "tipoUsuario",
        "plan"
    ]); //El underscore solo permite actualizar los campos dentro del arreglo que hagan match con el schema

    Usuario.findByIdAndUpdate(_id, body, { new: true, runValidators: true, useFindAndModify: false })
        .then(data => {
            res.status(200).json({
                ok: true,
                data
            });
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                mensaje: "Ocurrio un problema al actualizar al usuario",
                err: err
            });
        });
});

router.delete('/:id', verificaToken, (req, res) => {
    const _id = req.params.id;
    Usuario.findByIdAndUpdate(_id, { activo: false }, { new: true, runValidators: true })
        .then(data => {
            res.status(200).json({
                ok: true,
                data
            });
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                mensaje: "Ocurrio un problema al actualizar al usuario",
                err: err
            });
        });
});

module.exports = router;