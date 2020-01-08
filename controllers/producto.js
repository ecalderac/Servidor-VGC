'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Producto = require('../models/producto'); 

//Crear Producto
function saveProducto(req, res){
    var producto = new Producto();

    var params = req.body;
    producto.nombre = params.nombre;
    producto.precio_compra = params.precio_compra;
    producto.precio_venta = params.precio_venta;
    producto.stock = params.stock;
    producto.image = 'null';

    producto.save((err, productoStored) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!productoStored){
                res.status(404).send({message: 'No se ha guardado el producto'});
            }else{
                res.status(200).send({producto: productoStored});
            }
        } 
    });

}

//Modificar Producto
function modifyProducto(req, res){ 
    var productoId = req.params.id;
    var update = req.body;

    Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!productoUpdated){
                res.status(404).send({message: 'No se ha actualizado el producto'});
            }else{
                res.status(200).send({producto: productoUpdated});
            }
        }
    });
}

//Mostrar Producto
function getProducto(req, res){ 
    var productoId = req.params.id;

    Producto.findById(productoId, (err, producto) => {
        if(err){
            res.status(500).send({message:'Error en la peticion.'});
        }
        else{
            if(!producto){
                res.status(404).send({message:'El producto no existe'});
            }else{
                res.status(200).send({producto});
            }
        }
    });
 
}

//Mostrar Productos sin paginacion
function getAllProductos(req, res){ 

    Producto.find(function(err, productos){
        if(err){
            res.status(500).send({message:'Error en la peticion.'});
        }else{
            if(!productos){
                res.status(404).send({message:'No hay productos'});
            }else{
                return res.status(200).send({
                    productos: productos
                });
            }
        }
    });

}

//Mostrar Productos en Venta  
function getProductosVentas(req, res){
    var ventaId = req.params.venta;
 
    if(!ventaId){
       //Sacar todos los productos de la BD
       var find = Producto.find({}).sort('nombre');
    }else{
       //Sacar los productos de una venta en concreto de la BD
       var find = Producto.find({venta: ventaId}).sort('nombre'); 
    }
 
    find.populate({path: 'venta'}).exec((err, productos) => {
          if(err){
             res.status(500).send({message: 'Error en la peticion'});
          }else{
             if(!productos){
                res.status(404).send({message: 'No hay productos'});
             }else{
                res.status(200).send({productos});
             }
          }
    });
 }

//Eliminar Producto
function deleteProducto(req, res){
    var productoId = req.params.id;
    Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!productoRemoved){
                res.status(404).send({message: 'No se ha borrado el producto'});
            }else{
                res.status(200).send({producto: productoRemoved});
            }
        }
    });
}

// Subir Imagen
function uploadImage(req, res){
    var productoId = req.params.id;
    var filename = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg'){

            Producto.findByIdAndUpdate(productoId, {image: file_name}, (err, productoUpdated) => {
                if(!productoId){
                    res.status(404).send({message: 'No se ha podido actualizar al producto'});
                }
                else{
                    res.status(200).send({producto: productoUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extension del archivo no valida'});
        }   
    }
    else{
        res.status(200).send({message: 'No ha subido ninguna imagen...'});
    }
}

//Obtener Imagen
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/producto/'+imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    });
}

module.exports = {
    saveProducto,
    modifyProducto,
    getProducto,
    deleteProducto,
    uploadImage,
    getImageFile,
    getAllProductos,
    getProductosVentas
};