'use strict';
const uuidv4 = require('uuid/v4');
var mongoose = require('mongoose');
var Persona = require('../models/persona');
class PersonaController {
    verRegistro(req, res) {
        res.render('index', { title: 'Registro de personas', fragmento: 'fragmentos/frm_registro' });
    }
    
    guardar(req, res) {
        Persona.findOne({cedula: req.body.cedula}, (error, persona) => {
            if(error) {
                req.flash('info', 'Hubo un error', false);
                res.redirect('/facturas/registro/personas');
            } else if(persona) {
                req.flash('info', 'Cedula ya existe', false);
                res.redirect('/facturas/registro/personas');
            } else {
                new Persona({
                    id: new mongoose.Types.ObjectId(),
                    cedula: req.body.cedula,
                    apellidos: req.body.apellidos,
                    nombres: req.body.nombres,
                    external_id: uuidv4()
                }).save(function (err, newPersona) {
                    if(err) {
                        req.flash('info', 'Hubo un error en guardado', false);
                    } else if(newPersona) {
                        req.flash('info', 'Se ha registrado correctamente', false);                
                    }
                    res.redirect('/facturas/registro/personas');
                });
                
            }
            
        });
    }
}
module.exports = PersonaController;