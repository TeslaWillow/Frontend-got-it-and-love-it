'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/imagenes';
const path = require("path");
const multer = require("multer");
const mkdirp = require('mkdirp');
let express = require('express');
let router = express.Router();
let Imagen = require('../models/imagenes-model');
const planesModel = require('../models/planes-model');
const bodyParser = require('body-parser');
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
}).array('archivo');
//--------------------------
//Fin - Declaracion de middlewares
//--------------------------

//Declaracion de Rutas
router.get('/', (req, res) => {
    Imagen.find().exec((err, data) => {
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

router.post('/subir/:id', multerMiddleware, (req, res) => {
    const _id = req.params.id;
    const archivos = [];
    for (const file of req.files) {
        const nombreArchivo = file.originalname;
        const rutaArchivo = `${URL}/${folderImages}/${_id}/${nombreArchivo}`;
        let archivo = {
            nombreArchivo: nombreArchivo,
            rutaArchivo: rutaArchivo,
            descripcion: req.body.descripcion || "",
            extencion: path.extname(nombreArchivo),
            peso: file.size,
        };
        archivos.push(archivo);
    }
    Imagen.insertMany(archivos, (err, data) => {
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
//Fin declaracion de rutas

module.exports = router;