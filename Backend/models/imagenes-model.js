var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var imagenesSchema = new Schema({
    nombreArchivo: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    rutaArchivo: {
        type: String,
        required: [true, "La ruta es obligatoria"]
    },
    descripcion: {
        type: String,
        required: false,
        dafault: ""
    },
    fechaDeSubida: {
        type: Date,
        required: false,
        default: new Date()
    },
    extencion: {
        type: String,
        required: [true, "La extension es obligatoria"]
    },
    peso: {
        type: Number,
        required: [true, "El peso es obligatorio"]
    }
});

module.exports = mongoose.model('imagenes', imagenesSchema);