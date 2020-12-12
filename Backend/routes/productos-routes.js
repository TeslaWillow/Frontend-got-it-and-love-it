'use strict';
const Mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const folderImages = 'uploads/imagenes/empresas/productos';
let express = require('express');
let router = express.Router();
const _ = require("underscore");
//Middlewares
let { productoImagenMiddleware } = require('../middleware/productoImg-middleware');
let { verificaToken } = require('../middleware/auth-middleware');
//Declaracion de modelos
let Producto = require('../models/productos-model');
let Empresa = require('../models/empresas-model');

//Obtener todos los productos
router.get('/', (req, res) => {
    Producto.aggregate([{
            $lookup: {
                from: 'categorias',
                localField: 'categoria',
                foreignField: '_id',
                as: 'categoria'
            }
        }])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
// obtener un producto
router.get('/producto/:id', (req, res) => {
    const _id = Mongoose.Types.ObjectId(req.params.id);
    Producto.aggregate([{ "$match": { _id: _id } },
            {
                $lookup: {
                    from: 'categorias',
                    localField: 'categoria',
                    foreignField: '_id',
                    as: 'categoria'
                }
            }
        ])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

// Obtener los productos de una empresa
router.get('/empresa', verificaToken, (req, res) => {
    Empresa.findById({ "_id": req.usuario.empresa }, (err, empresaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "hubo un problema en el servidor", err }); }
        Producto.aggregate([{ "$match": { "_id": { "$in": empresaDB.productos } } },
                {
                    $lookup: {
                        from: 'categorias',
                        localField: 'categoria',
                        foreignField: '_id',
                        as: 'categoria'
                    }
                }
            ],
            (err, productosDB) => {
                if (err)
                    return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err });
                if (!productosDB)
                    return res.status(400).json({ ok: false, mensaje: "Esta empresa actualmente no tiene productos o no existen" })

                res.status(200).json({
                    ok: true,
                    mensaje: "sus productos",
                    data: productosDB
                })
            });
    });
});

// crear un producto
router.post('/', verificaToken, productoImagenMiddleware, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    if (req.file && req.file.originalname != "") {
        const nombreArchivo = req.file.originalname;
        const rutaArchivo = `${URL}/${folderImages}/${_idEmpresa}/${nombreArchivo}`;
        req.body.foto = rutaArchivo;
    }
    req.body.categoria = Mongoose.Types.ObjectId(req.body.categoria);
    const body = _.pick(req.body, ["nombre", "descripcion", "precio", "calificacion", "foto", "categoria"]);
    let productoDB = new Producto(body);
    productoDB.save((err, producto) => {
        if (err) {
            return res.status(500).json({ ok: false, err });
        };
        if (!producto) {
            return res.status(400).json({ ok: false, err });
        }

        Empresa.findById(_idEmpresa, (err, empresa) => {
            if (err)
                return res.status(500).json({ ok: false, err });
            if (!empresa)
                return res.status(400).json({ ok: false, err });
            empresa.productos.push(producto._id);
            empresa.save((err) => {
                if (err)
                    return res.status(500).json({ ok: false, err });
                res.status(200).json({ ok: true, producto, empresa });
            });
        });
    });
});
// actualizar un producto de la empresa
router.put('/:idProducto', verificaToken, productoImagenMiddleware, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    const _idProducto = req.params.idProducto;
    if (req.file && req.file.originalname != "") {
        const nombreArchivo = req.file.originalname;
        const rutaArchivo = `${URL}/${folderImages}/${_idEmpresa}/${nombreArchivo}`;
        req.body.foto = rutaArchivo;
    }
    const body = _.pick(req.body, ["nombre", "descripcion", "activo", "precio", "calificacion", "foto", "categoria"]);
    Producto.findByIdAndUpdate(_idProducto, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, data) => {
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
//  eliminar un producto
router.delete('/:idProducto', verificaToken, (req, res) => {
    const _id = req.params.idProducto;
    Producto.findByIdAndUpdate(_id, { activo: false }, { new: true, runValidators: true, context: 'query', useFindAndModify: false })
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