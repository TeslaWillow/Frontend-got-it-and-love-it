'use strict';
const Mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
const _ = require("underscore");
let Compra = require('../models/compras-model');
let Producto = require('../models/productos-model');
let Usuario = require('../models/usuarios-model');
const { verificaToken } = require('../middleware/auth-middleware');
//Obtener todos los usuarios
router.get('/', verificaToken, (req, res) => {
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
router.post('/', verificaToken, (req, res) => {
    const _idUsuario = req.usuario._id;
    const _idProducto = Mongoose.Types.ObjectId(req.body.producto);
    Producto.findById(_idProducto, (err, productoDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: "Fallo a nivel de producto",
                err
            });
        }
        if (!productoDB) {
            res.status(400).json({
                ok: false,
                mensaje: "No existe el producto solicitado",
                err
            });
        }
        //Si existe el producto entonces guardarlo y extraer la informacion necesaria de el
        req.body.precioUnitario = productoDB.precio;
        req.body.total = productoDB.precio * req.body.cantidad;
        const body = _.pick(req.body, ["producto", "fechaCompra", "cantidad", "precioUnitario", "total"]);
        let combraDB = new Compra(body);
        combraDB.save((err, compra) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Fallo a nivel de compra",
                    err
                });
            };
            if (!compra) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "no podemos recuperar la compra",
                    err
                });
            }
            //Si la compra se hizo de manera exitosa entonces se guarda en el arreglo de compras del usuario
            Usuario.findById(_idUsuario, (err, usuario) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: "Fallo a nivel de usuario",
                        err
                    });
                }
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "no se pudo encontrar al usuario",
                        err
                    });
                }
                usuario.compras.push(compra._id);
                usuario.save((err) => {
                    if (err) {
                        combraDB.deleteOne();
                        return res.status(500).json({ ok: false, mensaje: "Error a nivel de usuario", err });
                    }
                    res.status(200).json({ ok: true, compra, productoDB });
                });
            });
        });
    });
});

//Obtener las compras de un usuario dasdasda
router.get('/usuario', verificaToken, (req, res) => {
    Usuario.findById(req.usuario._id, (err, usuarioDB) => {
        if (err) { res.status(500).json({ ok: false, mensaje: "hubo un problema en el servidor", err }); }
        Compra.aggregate([
            { "$match": { "_id": { "$in": usuarioDB.compras } } },
            {
                $lookup: {
                    from: 'productos',
                    localField: 'producto',
                    foreignField: '_id',
                    as: 'producto'
                }
            }
        ], (err, data) => {
            if (err) { res.status(500).json({ ok: false, mensaje: "hubo un problema en el servidor", err }); }
            res.send(data);
        });
    });
});

module.exports = router;