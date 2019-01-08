'use strict';
var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
var Persona = require('../models/persona');
var Factura = require('../models/factura');
var forEach = require('sync-each');
class FacturaController {
    verRegistro(req, res) {
        Persona.find({}, (err, personas) => {
            if (personas) {
                var listaF = [];
                Factura.find({}, (error, facturas) => {
                    if (facturas) {
                        /*res.render('index', {title: 'Registro de facturas',
                         fragmento: 'fragmentos/frm_registroFacturas',
                         lista: personas,
                         listaF: facturas
                         });*/
                        forEach(facturas,
                                function (factura, next) {                                    
                                    Persona.findOne({id: factura.persona}, (err, per) => {
                                        if (per) {
                                            factura.datosPersona = per.apellidos + " " + per.nombres;
                                            listaF.push(factura);                                            
                                            next(err, listaF);
                                        }
                                    });
                                }, function (err, listaF) {                            
                                    res.render('index', {title: 'Registro de facturas',
                                        fragmento: 'fragmentos/frm_registroFacturas',
                                        lista: personas,
                                        listaF: listaF
                                    });
                        });


                    }
                });
            }
        });
    }

    guardar(req, res) {
        console.log(req.body.external);
        if (req.body.external == 0) {
            Factura.findOne({nro_factura: req.body.nro}, (error, factura) => {
                if (error) {
                    req.flash('info', 'Hubo un error', false);
                    res.redirect('/facturas/registro/facturas');
                } else if (factura) {
                    req.flash('info', 'Factura ya existe', false);
                    res.redirect('/facturas/registro/facturas');
                } else {
                    new Factura({
                        id: new mongoose.Types.ObjectId(),
                        fecha: req.body.fecha,
                        nro_factura: req.body.nro,
                        subtotal: req.body.subtotal,
                        iva: req.body.iva,
                        total: req.body.total,
                        descuento: req.body.descuento,
                        external_id: uuidv4(),
                        persona: req.body.clientes
                    }).save(function (err, newFactura) {
                        if (err) {
                            req.flash('info', 'Hubo un error en guardado', false);
                        } else if (newFactura) {
                            req.flash('info', 'Se ha registrado correctamente', false);
                        }
                        res.redirect('/facturas/registro/facturas');
                    });

                }

            });
        } else {
            //modifcar
            console.log("Modificar");
            Factura.update({external_id: req.body.external}, {$set: {
                    fecha: req.body.fecha,
                    nro_factura: req.body.nro,
                    subtotal: req.body.subtotal,
                    iva: req.body.iva,
                    total: req.body.total,
                    descuento: req.body.descuento,
                    persona: req.body.clientes
                }}, (err, factura) => {
                if (err) {
                    req.flash('info', 'Hubo un error en modificado', false);
                } else if (factura) {
                    req.flash('info', 'Se ha modificado correctamente', false);
                }
                res.redirect('/facturas/registro/facturas');
            });
        }
    }

}
module.exports = FacturaController;