var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var comprasSchema = new Schema({
    producto: {
        type: Schema.ObjectId,
        required: [true, "El producto es obligatorio"],
        ref: "producto",
    },
    fechaCompra: {
        type: Date,
        required: false,
        default: new Date()
    },
    cantidad: {
        type: Number,
        required: [true, "La cantidad de producto es requerida"]
    },
    precioUnitario: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    total: {
        type: Number,
        required: [true, "El total es obligatorio"]
    }
});

module.exports = mongoose.model('compras', comprasSchema);