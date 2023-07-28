/*
* autores: Diana Melina y Jesus Salazar
* julio 26, 2023
*/

//Requerimos  express y el modelo venta
const express = require('express');
const Venta = require('../models/ventas');
const Producto = require('../models/productos');
const router = express.Router();

//Funcion para obtener la fecha y hora local
function getDate() {
    // Obtén la fecha y hora actual en UTC
    const fechaActual = new Date();

    // Obtén el desplazamiento horario en minutos
    const offset = fechaActual.getTimezoneOffset();

    // Ajusta la fecha y hora sumando el desplazamiento horario en minutos
    const fechaLocal = new Date(fechaActual.getTime() - (offset * 60 * 1000));
    return fechaLocal;
};

/**-------------Crear Venta------------
 * La ruta '/crearVenta' es POST que permite crear una nueva venta.
 * Los datos se obtienen del cuerpo de la solicitud por medio del 'req.body'.
 * Se crea un nuevo documento "Venta".
 * Se gurda en la base de datos mediante newVenta.save().
 */ 
router.post('/crearVenta', async (req, res) => {
    // Obtener los IDs de los productos incluidos en la venta desde el cuerpo de la solicitud
    const {productos} = req.body;

    // obtener los detlles de los proutos por el id
    const productosDetalles = await Producto.find({_id: { $in: productos}}, 'precio');

    // calcular el precio total sumando los precios de los productos
    const total = productosDetalles.reduce((tot, producto) => tot + producto.precio, 0);

    // crear una nueva venta 
    const nuevaVenta = new Venta({ 
        productos: productos,
        total: total
    });
    nuevaVenta.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));

});

/**------------Obtener Ventas-------------------
 * Creamos la ruta '/obtenerVentas' 
 * Es un GET que permite acceder a los registros existentes en la base de datos
*/
router.get('/obtenerVentas', async (req, res) => {
    await Venta.find()
    .populate('productos') 
    .then((data) => res.json(data))
    .catch((error) => res.json({ message:error }));
});

/**-------------Obtener Venta-----------
 *la ruta '/obtenerVenta/:id' es un GET que perimte obtener una venta con un id en especifico.
 * El Id se obtine de los parametros de la URL (req.params).
 * Se busca la venta en la base de datos mediante 'Venta.findById(id)'.
 */
router.get('/obtenerVenta/:id', async (req, res) => {
    const {id} = req.params;
    await Venta.findById(id)
    .populate('productos') 
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

/**---------Actualizar Venta-----------
 * la ruta '/actualizarVenta/:id' es un PUT que permite actualizar una venta con un id en especifico.
 * el id se obtine de los parametros del URL 'req.params'.
 * Los datos a actualizar se obtienen del curspo de la solicitud 'req.body'.
 * Se actualiza el resgitro utilizando Venta.updateOne().
 * 
 */
router.put('/actualizarVenta/:id',async (req, res) => {
    // Obtener los IDs de los productos incluidos en la venta desde el cuerpo de la solicitud
    const {productos} = req.body;
    const {id} = req.params;
    const fecha = getDate();

    // obtener los detlles de los proutos por el id
    const productosDetalles = await Producto.find({_id: { $in: productos}}, 'precio');

    // calcular el precio total sumando los precios de los productos
    const total = productosDetalles.reduce((tot, producto) => tot + producto.precio, 0);


    Venta.updateOne({_id: id}, {$set:{productos: productos, total:total, fecha: fecha}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

/**------------Eliminar Venta------------
 * La ruta '/eliminarVenta/:id' es un DELETE que perimite eliminar una Venta en específico por Id.
 * El Id se obtiene de los parámetros de la URL.
 * El Id se utiliza para eliminar la venta de la base de datos mediante Venta.deleteOne().
 */
router.delete('/eliminarVenta/:id', (req, res) =>{
    const{id} = req.params;
    Venta.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;