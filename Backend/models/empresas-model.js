var mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
var Schema = mongoose.Schema;
/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var empresaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la empresa es requerido"]
    },
    direccion: {
        type: String,
        required: false
    },
    bloqueda: {
        type: Boolean,
        required: false,
        default: false
    },
    activo: {
        type: Boolean,
        required: false,
        default: true
    },
    foto: {
        type: String,
        required: false,
        default: `${URL}/assets/enterprise/default-enterprise.jpg`
    },
    rubro: {
        type: String,
        required: [true, "el rubro es requerido"]
    },
    productos: [{
        type: Schema.ObjectId,
        required: false,
        ref: "producto",
        default: null
    }],
    categorias: [{
        type: Schema.ObjectId,
        required: false,
        ref: "categorias",
        default: null
    }],
    bancoArchivos: [{
        type: Schema.ObjectId,
        required: false,
        ref: "bancoArchivos",
        default: null
    }],
    imagenes: [{
        type: Schema.ObjectId,
        required: false,
        ref: "imagenes",
        default: null
    }],
    paginas: [{
        type: Schema.ObjectId,
        required: false,
        ref: "pagina",
        default: null
    }]
});

module.exports = mongoose.model('empresas', empresaSchema);