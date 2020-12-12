'use strict';
let express = require('express');
let router = express.Router();
const _ = require("underscore");
let Categoria = require('../models/categorias-model');
let Empresa = require('../models/empresas-model');
const { verificaToken } = require('../middleware/auth-middleware');
//Obtener todas las categorias
router.get('/', verificaToken, (req, res) => {
    Categoria.find().exec((err, data) => {
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

//obtener una categoria en concreto
router.get('/categoria/:id', verificaToken, (req, res) => {
    const _idCategoria = req.params.id;
    Categoria.findById(_idCategoria).exec((err, data) => {
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

//Obtener las categorias de la empresa loggeada
router.get('/empresa', verificaToken, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    Empresa.findById(_idEmpresa).exec((err, empresaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "Ocurrio un error en el servidor" }) }
        if (!empresaDB) { return res.status(400).json({ ok: false, mensaje: "No pudimos encontrar tu empresa" }) }
        Categoria.find({ "_id": { "$in": empresaDB.categorias } }, (err, categoriasDB) => {
            if (err) { return res.status(500).json({ ok: false, mensaje: "Ocurrio un error en el servidor" }) }
            if (!categoriasDB) { return res.status(400).json({ ok: false, mensaje: "No pudimos encontrar tus categorias" }) }
            res.status(200).json({ ok: true, mensaje: "Aquí estan tus categorias", data: categoriasDB });
        });
    });
});
//Crear una categoria
router.post('/', verificaToken, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    const body = _.pick(req.body, ["nombre", "descripcion"]);
    let categoriaDB = new Categoria(body);
    categoriaDB.save((err, nuevaCategoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!nuevaCategoria) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Empresa.findById(_idEmpresa, (err, empresaDB) => {
            if (err) { return res.status(500).json({ ok: false, mensaje: "hubo un error en el servidor" }); }
            empresaDB.categorias.push(nuevaCategoria._id);
            empresaDB.save((err) => {
                if (err)
                    return res.status(500).json({ ok: false, err });
                res.status(200).json({ ok: true, empresaDB, nuevaCategoria });
            });
        });
    });
});
//Actualizar una categoria
router.put('/:id', verificaToken, (req, res) => {
    const _idCategoria = req.params.id;
    const body = _.pick(req.body, ["nombre", "descripcion"]);
    Categoria.findByIdAndUpdate(_idCategoria, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, data) => {
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
//Elimina una categoria de la empresa logeada
router.delete('/:id', verificaToken, (req, res) => {
    const _idCategoria = req.params.id;
    const _idEmpresa = req.usuario.empresa;
    Categoria.findById(_idCategoria, (err, CategoriaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "Error en el servidor" }) }
        Empresa.findByIdAndUpdate(_idEmpresa, { '$pull': { "categorias": CategoriaDB._id } }, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, empresaDB) => {
            if (err) { return res.status(500).json({ ok: false, mensaje: "Error en el servidor" }) }
            res.status(200).json({ ok: true, mensaje: "Categoria eliminada", CategoriaDB, empresaDB });
        });
    });
});

module.exports = router;