'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
        nombre: String,
        precio_compra: Number,
        precio_venta: Number,
        stock: Number,
        image: String
}); 

module.exports = mongoose.model('Producto', ProductoSchema); 