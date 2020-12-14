var mongoose = require('mongoose');
const puerto = process.env.PORT || 8888;
const URL = `http://localhost:${puerto}`;
var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var paginaSchema = new Schema({
    tituloGeneral: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    favicon: {
        type: String,
        required: false,
        default: `${URL}/assets/enterprise/favicon.png`
    },
    palabrasClave: [{
        type: String,
        required: false
    }],
    descripcion: {
        type: String,
        required: false,
        default: ""
    },
    principal: {
        type: Boolean,
        required: false,
        default: false
    },
    URLPagina: {
        type: String,
        required: true
    },
    plantilla: {
        type: Schema.ObjectId,
        ref: "plantillas",
        required: false
    },
    productos: [{
        type: Schema.ObjectId,
        required: false,
        ref: "producto"
    }]
});

module.exports = mongoose.model('paginas', paginaSchema);