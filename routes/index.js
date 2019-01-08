var express = require('express');
var router = express.Router();
var persona = require('../controllers/PersonaController');
var personaControl = new persona();
var factura = require('../controllers/FacturaController');
var facturaControl = new factura();
//var region = require('../controllers/RegionController');
//var regionController = new region();

/* GET home page. */
router.get('/facturas', function(req, res, next) {
  res.render('index', { title: 'Express', fragmento: 'fragmentos/frm_principal' });
});
router.get('/facturas/registro/personas', personaControl.verRegistro);
router.post('/facturas/registro/personas/save', personaControl.guardar);

router.get('/facturas/registro/facturas', facturaControl.verRegistro);
router.post('/facturas/registro/facturas/save', facturaControl.guardar);
/*router.get('/api/v1/region/todos', regionController.listarRegiones);
router.post('/api/v1/region/guardar', regionController.guardarRegion);
router.post('/api/v1/region/modificar/:id', regionController.modificarRegion);
*/
module.exports = router;
