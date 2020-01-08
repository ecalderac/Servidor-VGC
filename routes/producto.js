'user strict'

var express = require('express');
var ProductoController = require('../controllers/producto'); 
var api = express.Router(); 
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty'); 
var md_upload = multipart({ uploadDir: './uploads/producto' });

//Rutas de Producto
api.post('/producto', md_auth.ensureAuth,ProductoController.saveProducto);
api.put('/producto/:id', md_auth.ensureAuth, ProductoController.modifyProducto);
api.get('/producto/:id', md_auth.ensureAuth, ProductoController.getProducto);
api.get('/productos-almacenados', md_auth.ensureAuth, ProductoController.getAllProductos); 
api.delete('/producto/:id', md_auth.ensureAuth, ProductoController.deleteProducto);
api.post('/upload-image-producto/:id', [md_auth.ensureAuth, md_upload], ProductoController.uploadImage);
api.get('/get-image-producto/:imageFile', ProductoController.getImageFile);
api.get('/productos-venta/:venta?', md_auth.ensureAuth, ProductoController.getProductosVentas); 


module.exports = api; 