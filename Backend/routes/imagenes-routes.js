'use strict';
const Mongoose = require('mongoose');
const path = require("path");
const multer = require("multer");
let express = require('express');
let router = express.Router();

//--------------------------
//Declaracion de middlewares
//--------------------------
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: path.join(__dirname, '../public/uploads'),
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

const multerMiddleware = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads')
}).single('archivo');
//--------------------------
//Fin - Declaracion de middlewares
//--------------------------

//Declaracion de Rutas
router.post('/subir', multerMiddleware, (req, res) => {
    res.send(req.file);
    console.log(req.file);
});
//Fin declaracion de rutas

module.exports = router;