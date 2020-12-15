'use strict';
let express = require('express');
let router = express.Router();
let Pagina = require('../models/pagina-model');
let Empresa = require('../models/empresas-model');
let { guardarHTML } = require('../middleware/archivos-middleware');
let { verificaToken } = require('../middleware/auth-middleware');
//Retorna todas las paginas
router.get('/', verificaToken, (req, res) => {
    Pagina.find().exec((err, paginasDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
        res.status(200).json({ ok: true, mensaje: "aquí estan tus paginas", data: paginasDB });
    });
});
//Obtener las paginas de una empresa
router.get('/empresa', verificaToken, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    Empresa.findById({ "_id": _idEmpresa }, (err, empresaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "hubo un problema en el servidor", err }); }
        Pagina.aggregate([{ "$match": { "_id": { "$in": empresaDB.paginas } } },
                {
                    $lookup: {
                        from: 'paginas',
                        localField: 'paginas',
                        foreignField: '_id',
                        as: 'paginas'
                    }
                }
            ],
            (err, paginasDB) => {
                if (err)
                    return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err });
                if (!paginasDB)
                    return res.status(400).json({ ok: false, mensaje: "Esta empresa actualmente no tiene imagenes o no existen" })

                res.status(200).json({
                    ok: true,
                    mensaje: "sus paginas",
                    data: paginasDB
                })
            });
    });
});
//Crear una pagina
router.post('/', verificaToken, guardarHTML, (req, res) => {
    let body = req.body;
    const _idEmpresa = req.usuario.empresa;
    body.URLPagina = req.dir;
    let nuevaPagina = new Pagina(body);
    nuevaPagina.save((err, paginaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
        Empresa.findById(_idEmpresa).exec((err, empresaDB) => {
            empresaDB.paginas.push(paginaDB._id);
            empresaDB.save((err) => {
                if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
                res.status(200).json({ ok: true, mensaje: "pagina creada", paginaDB });
            });
        });
    });
});
//Actualizar una pagina
router.put('/:id', verificaToken, guardarHTML, (req, res) => {
    const _idEmpresa = req.usuario.empresa;
    const _idPagina = req.body.id;
    let body = req.body;
    body.URLPagina = req.dir;
    Pagina.findByIdAndUpdate(_idPagina, body, (err, paginaDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
        Empresa.findById(_idEmpresa).exec((err, empresaDB) => {
            empresaDB.paginas.push(paginaDB._id);
            empresaDB.save((err) => {
                if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
                res.status(200).json({ ok: true, mensaje: "pagina actualizada", paginaDB });
            });
        });
    });
});

module.exports = router;