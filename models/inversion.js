'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InversionSchema = Schema({
        fecha: Date,
        inversion: Number,
        comentarios: String
}); 

module.exports = mongoose.model('Inversion', InversionSchema); 