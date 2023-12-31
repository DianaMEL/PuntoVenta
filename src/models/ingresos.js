/*
* autores: Diana Melina y Jesus Salazar
* julio 26, 2023
*/

//Requerimos mongoose
const mongoose = require('mongoose');

//Definición del esquema para la colección de ingresos
const ingresoSchema = mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

// Crear el modelo basado en el esquema
const Ingreso = mongoose.model('Ingresos', ingresoSchema);

module.exports = Ingreso;