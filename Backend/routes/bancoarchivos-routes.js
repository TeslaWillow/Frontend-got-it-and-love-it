'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/archivos';
const path = require("path");
const multer = require("multer");
const mkdirp = require('mkdirp');
let express = require('express');
let router = express.Router();
let Archivo = require('../models/bancoarchivos-model');
let Empresa = require('../models/empresas-model');
//--------------------------
//Declaracion de middlewares
//--------------------------
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        const _id = req.params.idEmpresa;
        const dir = path.join(__dirname, `../public/${folderImages}/${_id}`);

        mkdirp(dir, err => cb(err, dir));
    }
});

const multerMiddleware = multer({
    storage,
    dest: (req, file, cb) => {
        const _id = req.params.idEmpresa;
        const dir = path.join(__dirname, `../public/${folderImages}/${_id}`);

        mkdirp(dir, err => cb(err, dir));
    }
}).array('archivo');
//--------------------------
//Fin - Declaracion de middlewares
//--------------------------
// Obtener todos los archivos
router.get('/', (req, res) => {
    Archivo.find().exec((err, data) => {
        if (err) {
            res.status(500).json({ ok: false, err });
        }
        if (!data) {
            res.status(400).json({ ok: false, err });
        }
        res.status(200).json({ ok: true, data });
    });
});

// Obtener los archivos de una empresa
router.get('/:id', (req, res) => {
    const _id = Mongoose.Types.ObjectId(req.params.id);
    Empresa.aggregate([{ "$match": { _id: _id } }, {
            $lookup: {
                from: 'bancoarchivos',
                localField: 'bancoArchivos',
                foreignField: '_id',
                as: 'bancoArchivos'
            }
        }])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

//Crear archivos
router.post('/subir/:idEmpresa', multerMiddleware, (req, res) => {
    const _id = req.params.idEmpresa;
    const archivosDB = [];
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
        archivosDB.push(archivo);
    }
    Archivo.insertMany(archivosDB, (err, archivos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "error a nivel de archivo",
                err
            });
        };
        if (!archivos) {
            return res.status(400).json({
                ok: false,
                mensaje: "error a nivel de archivo",
                err
            });
        }
        Empresa.findById(_id, (err, empresa) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Fallo a nivel de empresa",
                    err
                });
            }
            if (!empresa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Fallo a nivel de empresa",
                    err
                });
            }
            for (const archivo of archivos) {
                empresa.bancoArchivos.push(archivo._id);
            }
            empresa.save((err) => {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: "Error a nivel de empresa", err });
                }
                res.status(200).json({ ok: true, archivos, empresa });
            });
        });
    });

});
//Fin declaracion de rutas

module.exports = router;