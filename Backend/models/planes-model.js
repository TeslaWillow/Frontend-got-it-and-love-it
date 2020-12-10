var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var planesSchema = new Schema({
    nombrePlan: {
        type: String,
        required: [true, "El nombre del plan es requerido"]
    },
    descripcion: {
        type: String,
        required: [false]
    },
    activo: {
        type: Boolean,
        required: [true, "El estado del plan es requerido"]
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"]
    },
    color: {
        type: String,
        required: [true, "El color es requerido para ser mostrado correctamente"]
    },
    fechaCreacion: {
        type: Date,
        required: [false, "La fecha de creacion es requerida"],
        default: new Date()
    },
    restricciones: {
        limiteFilas: { type: Number, required: [true, "limiteFilas es requerida"] },
        limiteColumnas: { type: Number, required: [true, "limiteColumnas es requerida"] },
        limitePaginas: { type: Number, required: [true, "limitePaginas es requerida"] },
        limiteAlmacenamiento: { type: Number, required: [true, "limiteAlmacenamiento es requerida"] },
    }
});

module.exports = mongoose.model('planes', planesSchema);