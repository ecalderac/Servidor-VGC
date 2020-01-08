'user strict'

var express = require('express');
var InversionController = require('../controllers/inversion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//Rutas de Producto
api.post('/inversion', md_auth.ensureAuth, InversionController.saveInversion);
api.put('/inversion/:id', md_auth.ensureAuth, InversionController.modifyInversion);
api.get('/inversion/:id', md_auth.ensureAuth, InversionController.getInversion);
api.get('/inversiones-almacenadas', md_auth.ensureAuth, InversionController.getAllInversiones);
api.delete('/inversion/:id', md_auth.ensureAuth, InversionController.deleteInversion);
api.get('/inversion/:fecha_in/:fecha_te', md_auth.ensureAuth, InversionController.InversionesporFecha);


module.exports = api;