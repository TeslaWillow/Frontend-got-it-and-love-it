'use strict';
let express = require('express');
let router = express.Router();
let Empresa = require('../models/empresas-model');
let Usuario = require('../models/usuarios-model');
let { verificaToken } = require('../middleware/auth-middleware');

//Obtener los datos de todas las empresas
router.get('/', (req, res) => {
    Empresa.find().exec((err, data) => {
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

//Obtener una empresa en concreto
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Empresa.findById(id).exec((err, data) => {
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

//Obtener la empresa del usuario
router.get('/usuario/empresa', verificaToken, (req, res) => {
    const id = req.usuario.empresa;
    Empresa.findOne({ _id: id }).exec((err, empresaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "Tuvimos un problema en los servidores", err }); };
        if (!empresaDB) { return res.status(400).json({ ok: false, mensaje: "No tienes una empresa", err }); }

        if (empresaDB.activo === true) {
            res.status(200).json({ ok: true, mensaje: "Esta es tu empresa", data: empresaDB });
        } else {
            res.status(200).json({ ok: true, eliminada: true, mensaje: "Tu empresa esta actualmente eliminada" });
        }
    });
});
//Como lee el token hay que deslogearlo o pasarle un nuevo token
router.post('/', verificaToken, (req, res) => {
    if (typeof req.usuario.empresa === "undefined") {
        const body = req.body;
        let empresaDB = new Empresa(body);
        empresaDB.save((err, empresaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "ocurrio un problema en los servidores",
                    err
                });
            };
            if (!empresaDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "no pudimos encontrar la empresa",
                    err
                });
            }

            Usuario.findById(req.usuario._id, (err, usuarioDB) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: "ocurrio un problema en los servidores",
                        err
                    });
                }
                if (!usuarioDB) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "No pudimos encontra ra tu usuario",
                        err
                    });
                }
                usuarioDB.empresa = empresaDB._id;
                usuarioDB.save((err) => {
                    if (err) return res.status(500).json({ ok: false, err });
                    res.status(200).json({ ok: true, empresaDB, usuarioDB });
                });
            });
        });
    } else {
        res.status(400).json({
            ok: false,
            empresa: true,
            mensaje: "Este usuario ya tiene una empresa",
            tip: "Intenta modificar tu empresa"
        });
    }
});


//desbloquear
router.put('/desbloquear/:id', verificaToken, (req, res) => {
    const _idEmpresa = req.params.id;
    Empresa.findByIdAndUpdate(_idEmpresa, { bloqueda: false }).exec((err, empresaDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        res.status(200).json({ ok: true, mensaje: "Empresa desbloqueada exitosamente", empresaDB });
    });
});

//Bloquear una empresa
router.delete('/bloquear/:id', verificaToken, (req, res) => {
    const _idEmpresa = req.params.id;
    Empresa.findByIdAndUpdate(_idEmpresa, { bloqueda: true }).exec((err, empresaDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        res.status(200).json({ ok: true, mensaje: "Empresa bloqueada exitosamente", empresaDB });
    });
});

//Borrar una empresa
router.delete('/:id', verificaToken, (req, res) => {
    const _idEmpresa = req.params.id;
    Empresa.findByIdAndUpdate(_idEmpresa, { activo: false }).exec((err, empresaDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        res.status(200).json({ ok: true, mensaje: "Empresa borrada exitosamente", empresaDB });
    });
});

module.exports = router;