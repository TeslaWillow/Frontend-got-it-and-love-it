var mongoose = require('mongoose');
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
        default: "assets/img/profile-img/cliente-img.jpg"
    },
    activo: {
        type: Boolean,
        require: false,
        default: true
    },
    tipoUsuario: {
        type: mongoose.Types.ObjectId,
        ref: 'tipoUsuario',
        required: false,
        default: mongoose.Types.ObjectId("5f994defa49f640504568adf") //Cliente
    },
    plan: {
        type: mongoose.Types.ObjectId,
        ref: 'plan',
        required: false,
        default: mongoose.Types.ObjectId("5f997430a49f640504568ae8") //Plan Gratis
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

usuariosSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('usuarios', usuariosSchema);