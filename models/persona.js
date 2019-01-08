'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PersonaSchema = Schema({
    id: mongoose.Schema.Types.ObjectId,
    external_id: String,
    cedula: String,
    apellidos: String,
    nombres: String    
}, false);

module.exports = mongoose.model("Persona", PersonaSchema);