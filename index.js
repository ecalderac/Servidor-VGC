'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://eduardo:T6yq4NHQrmreslkv@cluster0-2izke.mongodb.net/nube-veronica-godoy', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Base de Datos corriendo correctamente");
        app.listen(port, function() {
            console.log("Servidor de la aplicacion Veronica-Godoy corriendo en http://localhost:" + port);
        });
    }
});

//BD LOCAL: 'mongodb://localhost:27017/DB_VERONICA_GODOY'
//BD ONLINE: 'mongodb+srv://eduardo:T6yq4NHQrmreslkv@cluster0-2izke.mongodb.net/nube-veronica-godoy'