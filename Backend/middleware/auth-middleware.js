// ------------------------------------
// Middleware para verificar los tokens
// ------------------------------------
const config = require('../controller/config');
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token'); //Nombre del header

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: "No esta autorizado",
                err
            });
        }
        // Datos del usuario que esta solicitando informacion
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = {
    verificaToken
};