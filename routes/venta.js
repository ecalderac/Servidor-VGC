'user strict'

var express = require('express');
var VentaController = require('../controllers/venta'); 
var api = express.Router(); 
var md_auth = require('../middlewares/authenticated');

//Rutas de Venta
api.post('/venta', md_auth.ensureAuth, VentaController.saveVenta);
api.put('/venta/:id', md_auth.ensureAuth, VentaController.modifyVenta);
api.get('/venta/:id', md_auth.ensureAuth, VentaController.getVenta);
api.get('/ventas', md_auth.ensureAuth, VentaController.getVentas); 
api.delete('/venta/:id', md_auth.ensureAuth, VentaController.deleteVenta);
api.get('/venta/:fecha_in/:fecha_te', md_auth.ensureAuth, VentaController.VentaporFecha);

module.exports = api;