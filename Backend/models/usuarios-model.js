var mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    telefono: {
        type: String,
        required: false
    },
    foto: {
        type: String,
        required: false,
        default: `${URL}/assets/profile/default-profile.png`
    },
    activo: {
        type: Boolean,
        require: false,
        default: true
    },
    tipoUsuario: {
        type: Schema.ObjectId,
        ref: 'tipousuarios',
        required: true
    },
    plan: {
        type: Schema.ObjectId,
        ref: 'plan',
        required: true
    },
    compras: [{
        type: Schema.ObjectId,
        ref: "compras",
        required: false
    }],
    empresa: [{
        type: Schema.ObjectId,
        ref: "empresas",
        required: false
    }]
});

usuariosSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('usuarios', usuariosSchema);