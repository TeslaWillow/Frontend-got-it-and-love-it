var mongoose = require('mongoose');

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
        required: [true, 'El nombre es necesario']
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    telefono: {
        type: String,
        required: false
    },
    foto: {
        type: String,
        required: false
    },
    activo: {
        type: Boolean,
        require: true,
        default: true
    },
    tipoUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'tipoUsuario',
        required: true
    },
    compras: {
        type: Array,
        required: false
    },
    empresa: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('usuarios', usuariosSchema);