'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
        nombre: String,
        apellido: String,
        email: String,
        rut: String,
        password: String,
}); 

module.exports = mongoose.model('Usuario', UsuarioSchema); 