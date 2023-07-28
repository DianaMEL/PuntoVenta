/*
* autores: Diana Melina y Jesus Salazar
* julio 26, 2023
*/

//Requerimos mongoose
const mongoose = require('mongoose');

//Definición del esquema para la colección de ventas
const ventaSchema = mongoose.Schema({
    productos:[{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Productos', 
        required: true 
    }],
    total: {
        type:Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo basado en el esquema
const Venta = mongoose.model('Ventas', ventaSchema);

module.exports = Venta;