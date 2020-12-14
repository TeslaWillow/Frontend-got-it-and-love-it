'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/archivos';
const path = require("path");
let express = require('express');
let router = express.Router();
let Archivo = require('../models/bancoarchivos-model');
let Empresa = require('../models/empresas-model');

let { bancoArchivosMiddleware } = require('../middleware/bancoarchivos-middleware');
let { verificaToken } = require('../middleware/auth-middleware');
// Obtener todos los archivos
router.get('/', verificaToken, (req, res) => {
    Archivo.find().exec((err, data) => {
        if (err) { return res.status(500).json({ ok: false, err }); }
        if (!data) { return res.status(400).json({ ok: false, err }); }
        res.status(200).json({ ok: true, data });
    });
});
//Obtener una empresa en concreto
router.get('/archivo/:id', verificaToken, (req, res) => {
    const _idArchivo = req.params.id;
    Archivo.findById(_idArchivo).exec((err, data) => {
        if (err) { return res.status(500).json({ ok: false, err }); }
        if (!data) { return res.status(400).json({ ok: false, err }); }
        res.status(200).json({ ok: true, data });
    });
});

// Obtener los archivos de una empresa
router.get('/empresa', verificaToken, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    Empresa.findById({ "_id": _idEmpresa }, (err, empresaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "hubo un problema en el servidor", err }); }
        Archivo.aggregate([{ "$match": { "_id": { "$in": empresaDB.bancoArchivos } } },
                {
                    $lookup: {
                        from: 'bancoarchivos',
                        localField: 'bancoArchivos',
                        foreignField: '_id',
                        as: 'bancoArchivos'
                    }
                }
            ],
            (err, archivosDB) => {
                if (err)
                    return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err });
                if (!archivosDB)
                    return res.status(400).json({ ok: false, mensaje: "Esta empresa actualmente no tiene archivos o no existen" })

                res.status(200).json({
                    ok: true,
                    mensaje: "sus archivos",
                    data: archivosDB
                })
            });
    });
});

//Crear archivos
router.post('/', verificaToken, bancoArchivosMiddleware, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    const archivosDB = [];
    for (const file of req.files) {
        const nombreArchivo = file.originalname;
        const rutaArchivo = `${URL}/${folderImages}/${_idEmpresa}/${nombreArchivo}`;
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
            return res.status(500).json({ ok: false, mensaje: "error en el servidor", err });
        };
        if (!archivos) {
            return res.status(400).json({ ok: false, mensaje: "No pudimos recuperar los archivos creados", err });
        }
        Empresa.findById(_idEmpresa, (err, empresa) => {
            if (err) {
                return res.status(500).json({ ok: false, mensaje: "Fallo a nivel de empresa", err });
            }
            if (!empresa) {
                return res.status(400).json({ ok: false, mensaje: "Fallo a nivel de empresa", err });
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