'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FacturaSchema = Schema({
    id: mongoose.Schema.Types.ObjectId,
    external_id: String,
    fecha: String,
    nro_factura: String,
    subtotal: Number,
    iva: Number,
    total: Number,
    descuento: Number,
    estado: {type: Boolean, default: true},
    persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
    }

}, false);

module.exports = mongoose.model("Factura", FacturaSchema);
