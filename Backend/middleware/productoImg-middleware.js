'use strict';
const folderImages = 'uploads/imagenes/empresas/productos';
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
        const _id = req.usuario.empresa;
        const dir = path.join(__dirname, `../public/${folderImages}/${_id}`);

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

const productoImagenMiddleware = multer({
    storage,
    dest: (req, file, cb) => {
        const _id = req.usuario.empresa;
        const dir = path.join(__dirname, `../public/${folderImages}/${_id}`);

        mkdirp(dir, err => cb(err, dir));
    }
}).single('archivo');
//--------------------------
//Fin - Declaracion de middlewares
//--------------------------

module.exports = {
    productoImagenMiddleware
}