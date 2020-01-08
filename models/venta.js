'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    fecha: Date,
    estado: String,
    nombre_fiador: String,
    cant_productos: Number,
    precio_total: Number,
    productos: [{ type: Schema.ObjectId, ref: 'Producto' }],
    prodCantidad: [{ type: Number }],
    prodPrecio: [{ type: Number }]
});

module.exports = mongoose.model('Venta', VentaSchema);

/*
productos: [{
    id: {type: Schema.ObjectId, ref: 'Producto'} 
}] 
*/