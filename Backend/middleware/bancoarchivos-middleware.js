const folderImages = 'uploads/archivos';
const path = require("path");
const multer = require("multer");
const mkdirp = require('mkdirp');
//--------------------------
//Declaracion de middlewares
//--------------------------
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        const _idEmpresa = req.usuario.empresa;
        const dir = path.join(__dirname, `../public/${folderImages}/${_idEmpresa}`);

        mkdirp(dir, err => cb(err, dir));
    }
});

const bancoArchivosMiddleware = multer({
    storage,
    dest: (req, file, cb) => {
        const _idEmpresa = req.usuario.empresa;
        const dir = path.join(__dirname, `../public/${folderImages}/${_idEmpresa}`);

        mkdirp(dir, err => cb(err, dir));
    }
}).array('archivo');
//--------------------------
//Fin - Declaracion de middlewares
//--------------------------

module.exports = {
    bancoArchivosMiddleware
}