'use strict';
const Mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
const _ = require("underscore");
let Compra = require('../models/compras-model');
let Producto = require('../models/productos-model');
let Usuario = require('../models/usuarios-model');

//Obtener todos los usuarios
router.get('/', (req, res) => {
    Compra.aggregate([{
            $lookup: {
                from: 'productos',
                localField: 'producto',
                foreignField: '_id',
                as: 'producto'
            }
        }])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

//Crear una compra
router.post('/:idUsuario', (req, res) => {
    const _idUsuario = req.params.idUsuario;
    req.body.producto = Mongoose.Types.ObjectId(req.body.producto);
    Producto.findById(req.body.producto, (err, producto) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!producto) {
            res.status(400).json({
                ok: false,
                mensaje: "No existe el producto solicitado",
                err
            });
        }
        //Si existe el producto entonces guardarlo y extraer la informacion necesaria de el
        req.body.precioUnitario = producto.precio;
        req.body.total = producto.precio * req.body.cantidad;
        const body = _.pick(req.body, ["producto", "fechaCompra", "cantidad", "precioUnitario", "total"]);
        let combraDB = new Compra(body);
        combraDB.save((err, compra) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            if (!compra) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Si la compra se hizo de manera exitosa entonces se guarda en el arreglo de compras del usuario
            Usuario.findById(_idUsuario, (err, usuario) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    });
                }
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                usuario.compras.push(compra._id);
                usuario.save((err) => {
                    if (err) return res.status(500).json({ ok: false, err });
                    res.status(200).json({ ok: true, compra, producto });
                });
            });
        });
    });
});

module.exports = router;