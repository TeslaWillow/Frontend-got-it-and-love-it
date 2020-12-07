var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var tipoUsuarioSchema = new Schema({
    tipo: {
        type: String,
        required: [true, 'El tipo es necesario']
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('tipoUsuario', tipoUsuarioSchema);