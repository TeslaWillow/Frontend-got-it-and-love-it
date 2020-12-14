'use strict';
let express = require('express');
let router = express.Router();
let Pagina = require('../models/pagina-model');
let Empresa = require('../models/empresas-model');
let { guardarHTML } = require('../middleware/archivos-middleware');
let { verificaToken } = require('../middleware/auth-middleware');
//Retorna todas las paginas
router.get('/', (req, res) => {
    Pagina.find().exec((err, paginasDB) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "ocurrio un error en el servidor", err }); }
        res.status(200).json({ ok: true, mensaje: "aquí estan tus paginas", data: paginasDB });
    });
});

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

module.exports = router;