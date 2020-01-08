'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Venta = require('../models/venta');

//Crear Venta
function saveVenta(req, res) {
    var venta = new Venta();

    var params = req.body;
    venta.fecha = params.fecha;
    venta.estado = params.estado;
    venta.nombre_fiador = params.nombre_fiador;
    venta.cant_productos = params.cant_productos;
    venta.precio_total = params.precio_total
    venta.productos = params.productos;
    venta.prodCantidad = params.prodCantidad;
    venta.prodPrecio = params.prodPrecio;

    venta.save((err, ventaStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!ventaStored) {
                res.status(404).send({ message: 'No se ha guardado la venta' });
            } else {
                res.status(200).send({ venta: ventaStored });
            }
        }
    });

}

//Modificar Venta
function modifyVenta(req, res) {
    var ventaId = req.params.id;
    var update = req.body;

    Venta.findByIdAndUpdate(ventaId, update, (err, ventaUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!ventaUpdated) {
                res.status(404).send({ message: 'No se ha actualizado la venta' });
            } else {
                res.status(200).send({ venta: ventaUpdated });
            }
        }
    });
}

//Mostrar Venta
function getVenta(req, res) {
    var ventaId = req.params.id;

    Venta.findById(ventaId, (err, venta) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!venta) {
                res.status(404).send({ message: 'La venta no existe' });
            } else {
                res.status(200).send({ venta });
            }
        }
    });
}

//Mostrar Ventas 
function getVentas(req, res) {

    Venta.find(function(err, ventas) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!ventas) {
                res.status(404).send({ message: 'No hay ventas' });
            } else {
                return res.status(200).send({
                    ventas: ventas
                });
            }
        }
    });
    //codigo mas eficiente, populando daots de un arreglo de objetos de productos y mostrando solo el nombre de estos
    // Venta.find({})
    //     .populate('productos', 'nombre')
    //     .exec((err, ventas) => {
    //         if (err) {
    //             res.status(500).send({ message: 'Error en la peticion.' });
    //         } else {
    //             if (!ventas) {
    //                 res.status(404).send({ message: 'No hay ventas' });
    //             } else {
    //                 return res.status(200).send({
    //                     ventas: ventas
    //                 });
    //             }
    //         }
    //     });
}

//Eliminar Venta
function deleteVenta(req, res) {
    var ventaId = req.params.id;
    Venta.findByIdAndRemove(ventaId, (err, ventaRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!ventaRemoved) {
                res.status(404).send({ message: 'No se ha borrado la venta' });
            } else {
                res.status(200).send({ venta: ventaRemoved });
            }
        }
    });
}

function VentaporFecha(req, res) {
    var fecha_inicio = req.params.fecha_in;
    var fecha_termino = req.params.fecha_te;
    Venta.find({ "fecha": { $gte: fecha_inicio, $lte: fecha_termino } }, function(err, ventas) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!ventas) {
                res.status(404).send({ message: 'No hay ventas' });
            } else {
                return res.status(200).send({
                    ventas: ventas
                });
            }
        }
    });

}

module.exports = {
    saveVenta,
    modifyVenta,
    getVenta,
    getVentas,
    deleteVenta,
    VentaporFecha
};