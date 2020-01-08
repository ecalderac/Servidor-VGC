'user strict'

var express = require('express');
var UserController = require('../controllers/usuario'); 

var api = express.Router(); 
var md_auth = require('../middlewares/authenticated');

//Rutas de Usuario
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/registro', UserController.saveUsuario);
api.post('/login', UserController.loginUsuario);
api.put('/actualizar-usuario/:id', md_auth.ensureAuth, UserController.updateUsuario);

module.exports = api; 