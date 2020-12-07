'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/imagenes/usuarios';
const path = require("path");
const multer = require("multer");
const mkdirp = require('mkdirp');
let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const _ = require("underscore");
let Usuario = require('../models/usuarios-model');

//--------------------------
//Declaracion de middlewares
//--------------------------
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        const _id = req.params.id;
        const dir = path.join(__dirname, `../public/${folderImages}/${_id}`);

        mkdirp(dir, err => cb(err, dir));
    },
    limits: { fileSize: 1 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo no es soportado");
    }
});

const multerMiddleware = multer({
    storage,
    dest: (req, file, cb) => {
        const _id = req.params.id;
        const dir = path.join(__dirname, `../public/${folderImages}/${_id}`);

        mkdirp(dir, err => cb(err, dir));
    }
}).single('archivo');
//--------------------------
//Fin - Declaracion de middlewares
//--------------------------

//obtener usuarios
router.get('/', (req, res) => {
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
        password: bcrypt.hashSync(body.password, 10),
        plan: Mongoose.Types.ObjectId(body.plan),
        tipoUsuario: Mongoose.Types.ObjectId(body.tipoUsuario)
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

router.put('/:id', multerMiddleware, (req, res) => {
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
    const _id = req.params.id;
    Usuario.findByIdAndUpdate(_id, { activo: false }, { new: true, runValidators: true })
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

module.exports = router;