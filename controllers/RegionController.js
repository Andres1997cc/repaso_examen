'use strict';
var models = require('./../models/');
const uuidv4 = require('uuid/v4');
class Regioncontroller {
    listarRegiones(req, res) {
        var Region = models.region;
        Region.findAll().then(function (regiones){
            res.json(regiones);
        });
    }
    
    guardarRegion(req, res) {
        var Region = models.region;
        Region.findOne({where: {nombre: req.body.nombre}}).then(function (region) {
            if(!region) {
                var data = {
                    exteral_id: uuidv4(),
                    nombre: req.body.nombre
                };
                Region.create(data).then(function (newRegion, created) {
                    if(!newRegion) {
                        res.json({mensaje: "No se registro", siglas:"NSR"});
                        res.status(400);
                    } else {
                        res.json({mensaje: "Se registro", siglas:"SR", 
                            external_id: newRegion.external_id});
                        res.status(200);
                    }
                    
                });
            } else {
                res.json({mensaje: "No se registro, repetido", siglas:"NSRR"});
                res.status(400);
            }
        });
    }
    
    modificarRegion(req, res) {
        var Region = models.region;
        Region.findOne({where: {exteral_id: req.params.id}}).then(function (region) {
            if(region) {
                var data = {                    
                    nombre: req.body.nombre
                };
                Region.update(data, {where: {id: region.id}}).then(function (updateRegion, updated) {
                    if(!updateRegion) {
                        res.json({mensaje: "No se modifico", siglas:"NSM"});
                        res.status(400);
                    } else {
                        res.json({mensaje: "Se modifico", siglas:"SM", 
                            external_id: updateRegion.external_id});
                        res.status(200);
                    }
                    
                });
            } else {
                res.json({mensaje: "No existe el registro", siglas:"NER"});
                res.status(400);
            }
        });
    }
    
}
module.exports = Regioncontroller;