'use strict';
const Mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let usuarios = require('../models/usuarios-model');
//obtener usuarios
router.get('/', (req, res) => {
    usuarios.aggregate([{
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
    usuarios.aggregate([{ "$match": { _id: id } }, {
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

module.exports = router;