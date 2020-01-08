'use strict'

var path = require('path');
var fs = require('fs');
var Inversion = require('../models/inversion');

//Crear Inversión
function saveInversion(req, res) {
    var inversion = new Inversion();

    var params = req.body;
    inversion.fecha = params.fecha;
    inversion.inversion = params.inversion;
    inversion.comentarios = params.comentarios;

    inversion.save((err, inversionStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!inversionStored) {
                res.status(404).send({ message: 'No se ha guardado la inversión' });
            } else {
                res.status(200).send({ inversion: inversionStored });
            }
        }
    });

}

//Modificar Inversion
function modifyInversion(req, res) {
    var inversionId = req.params.id;
    var update = req.body;

    Inversion.findByIdAndUpdate(inversionId, update, (err, inversionUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!inversionUpdated) {
                res.status(404).send({ message: 'No se ha actualizado la inversión' });
            } else {
                res.status(200).send({ inversion: inversionUpdated });
            }
        }
    });
}

//Mostrar Inversion
function getInversion(req, res) {
    var inversionId = req.params.id;

    Inversion.findById(inversionId, (err, inversion) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!inversion) {
                res.status(404).send({ message: 'La inversión no existe' });
            } else {
                res.status(200).send({ inversion });
            }
        }
    });

}

//Eliminar Inversion
function deleteInversion(req, res) {
    var inversionId = req.params.id;
    Inversion.findByIdAndRemove(inversionId, (err, inversionRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!inversionRemoved) {
                res.status(404).send({ message: 'No se ha borrado la inversion' });
            } else {
                res.status(200).send({ inversion: inversionRemoved });
            }
        }
    });
}

//Mostrar todas las Inversiones
function getAllInversiones(req, res) {

    Inversion.find(function(err, inversiones) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!inversiones) {
                res.status(404).send({ message: 'No hay inversiones' });
            } else {
                return res.status(200).send({
                    inversiones: inversiones
                });
            }
        }
    });

}

//Buscar inversiones entre fechas
function InversionesporFecha(req, res) {
    var fecha_inicio = req.params.fecha_in;
    var fecha_termino = req.params.fecha_te;
    Inversion.find({ "fecha": { $gte: fecha_inicio, $lte: fecha_termino } }, function(err, inversiones) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!inversiones) {
                res.status(404).send({ message: 'No hay inversiones' });
            } else {
                return res.status(200).send({
                    inversiones: inversiones
                });
            }
        }
    });

}

module.exports = {
    saveInversion,
    modifyInversion,
    getInversion,
    getAllInversiones,
    InversionesporFecha,
    deleteInversion
};