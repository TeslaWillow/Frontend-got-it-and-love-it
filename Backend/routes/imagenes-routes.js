'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/imagenes/empresas/bancoimagenes';
const path = require("path");
let express = require('express');
let router = express.Router();
let Imagen = require('../models/imagenes-model');
let Empresa = require('../models/empresas-model');
const { bancoImagenesMiddleware } = require('../middleware/bancoimagenes-middleware');
const { verificaToken } = require('../middleware/auth-middleware');
//Declaracion de Rutas
router.get('/', verificaToken, (req, res) => {
    Imagen.find().exec((err, imagenesDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!imagenesDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            data: imagenesDB
        });
    });
});
//Obtener una imagen en concreto
router.get('/imagen/:id', (req, res) => {
    const _idImagen = req.params.id;
    Imagen.findById(_idImagen).exec((err, imagenDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
        if (!imagenDB) { return res.status(400).json({ ok: false, mensaje: "No pudimos encontrar la imagen solicitada", err }); }
        res.status(200).json({ ok: true, mensaje: "Aquí esta tu imagen", data: imagenDB });
    });
});
//Obtener las imagenes de una empresa
router.get('/empresa', verificaToken, (req, res) => {
    Empresa.findById({ "_id": req.usuario.empresa }, (err, empresaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "hubo un problema en el servidor", err }); }
        Imagen.aggregate([{ "$match": { "_id": { "$in": empresaDB.imagenes } } },
                {
                    $lookup: {
                        from: 'imagenes',
                        localField: 'imagenes',
                        foreignField: '_id',
                        as: 'imagenes'
                    }
                }
            ],
            (err, imagenesDB) => {
                if (err)
                    return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err });
                if (!imagenesDB)
                    return res.status(400).json({ ok: false, mensaje: "Esta empresa actualmente no tiene imagenes o no existen" })

                res.status(200).json({
                    ok: true,
                    mensaje: "sus imagenes",
                    data: imagenesDB
                })
            });
    });
});
//Guardar imagenes para una empresa (loggeada)
router.post('/', verificaToken, bancoImagenesMiddleware, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    const archivos = [];
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
        archivos.push(archivo);
    }
    Imagen.insertMany(archivos, (err, imagenesDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "Error en el servidor", err }); }
        if (!imagenesDB) { return res.status(400).json({ ok: false, mensaje: "No se crearon las imagenes correctamnete", err }); }
        Empresa.findById(_idEmpresa, (err, empresa) => {
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
                    mensaje: "No pudimos encontrar tu empresa",
                    err
                });
            }
            for (const imagen of imagenesDB) {
                empresa.imagenes.push(imagen._id);
            }
            empresa.save((err) => {
                if (err) { return res.status(500).json({ ok: false, mensaje: "Error en el servidor", err }); }
                res.status(200).json({ ok: true, imagenesDB, empresa });
            });
        });
    });
});
//Elimina una imagen de la empresa logeada
router.delete('/:id', verificaToken, (req, res) => {
    const _idImagen = req.params.id;
    const _idEmpresa = req.usuario.empresa;
    Imagen.findById(_idImagen, (err, imagenDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "Error en el servidor" }) }
        Empresa.findByIdAndUpdate(_idEmpresa, { '$pull': { "imagenes": imagenDB._id } }, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, empresaDB) => {
            if (err) { return res.status(500).json({ ok: false, mensaje: "Error en el servidor" }) }
            res.status(200).json({ ok: true, mensaje: "Imagen eliminada", imagenDB, empresaDB });
        });
    });
});
//Fin declaracion de rutas

module.exports = router;