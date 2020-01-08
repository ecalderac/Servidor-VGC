'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cargar Rutas
var user_routes = require('./routes/usuario');
var product_routes = require('./routes/producto');
var venta_routes = require('./routes/venta');
var inversion_routes = require('./routes/inversion');

//Configuracion de Cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas Base
app.use('/api', user_routes);
app.use('/api', product_routes);
app.use('/api', venta_routes);
app.use('/api', inversion_routes);
module.exports = app;