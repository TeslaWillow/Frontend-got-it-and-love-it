const folderImages = 'uploads/imagenes/empresas/bancoimagenes';
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
    },
    limits: { fileSize: 1 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo no es soportado");
    }
});

const bancoImagenesMiddleware = multer({
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
    bancoImagenesMiddleware
};