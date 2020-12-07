var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es necesario']
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('categorias', categoriaSchema);