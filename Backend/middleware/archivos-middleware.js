const folderFiles = 'uploads/codigo/html';
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
const path = require("path");
const mkdirp = require('mkdirp');
var fs = require("fs");

function replaceAll(string, busqueda, remplazo) {
    return string.split(busqueda).join(remplazo);
}

const guardarHTML = (req, res, next) => {
    const _idEmpresa = req.usuario.empresa;
    const data = req.body.HTMLPagina;
    const pagina = replaceAll(req.body.tituloGeneral, " ", "-");
    const carpeta = path.join(__dirname, `../public/${folderFiles}/${_idEmpresa}`);
    mkdirp(carpeta, err => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "no se pudo hacer la grabacion de la pagina", err }) }
    });
    const dir = `${carpeta}/${pagina}.html`
    fs.writeFile(dir, data, (err) => {
        if (err) { return res.status(500).json({ ok: false, mensaje: "no se pudo hacer la grabacion de la pagina", err }) }
        req.dir = `${URL}/${folderFiles}/${_idEmpresa}/${pagina}.html`;
        next();
    });
};

module.exports = {
    guardarHTML
};