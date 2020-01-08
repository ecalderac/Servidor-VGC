'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/usuario');
var jwt = require('../services/jwt');

//Funcion de Prueba
function pruebas (req, res){
    res.status(200).send({
        message: 'Probando un accion del controlador de usuarios'
    });
}

//Registrar Usuario
function saveUsuario(req, res){
    var user = new User();

    var params = req.body;

    console.log(params);

    user.nombre = params.nombre; 
    user.apellido = params.apellido;
    user.email = params.email;
    user.rut = params.rut; 
    user.password = params.password;

    if(params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;

            if(user.nombre != null && user.apellido != null && user.email != null && user.rut != null){
                user.save((err,userStored)=> {
                    if(err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });

            }else{
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });   
    }
    else{
        res.status(200).send({message: 'Introduce la contraseña'});
    }

}

//Login Usuario
function loginUsuario(req, res){
    var params = req.body;

    var rut = params.rut;
    var password = params.password

    User.findOne({rut: rut.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        if(params.gethash){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }
                        else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }        
                });
            }
        }
    });
}

//Actualizar Usuario
function updateUsuario(req, res){
    var userId = req.params.id;
    var update = req.body;

    //nbo
    if(userId != req.user.sub){
       return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar al usuario'});
            }
            else{
                res.status(200).send({user: userUpdated});
            }
        }
    })
}



module.exports = {
    pruebas,
    saveUsuario,
    loginUsuario,
    updateUsuario
};