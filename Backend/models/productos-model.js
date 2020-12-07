var mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es necesario']
    },
    descripcion: {
        type: String,
        required: false
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"]
    },
    calificacion: {
        type: Number,
        required: [true, "La calificacion es necesaria"],
        default: 0
    },
    foto: {
        type: String,
        required: [true, "La foto es necesaria"],
        default: `${URL}/assets/products/default-product.jpg`
    },
    categoria: {
        type: Schema.ObjectId,
        required: [true, "La categoria es necesaria"],
    }
});

module.exports = mongoose.model('productos', productosSchema);