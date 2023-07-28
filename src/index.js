/*
* autores: Diana Melina y Jesus Salazar
* julio 25, 2023
*/

// Requerimos o importamos los modulos que se utilizaran 
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
//definimos el puerto para el servidor 
const port = process.env.PORT || 3000;

// middlewares
//Se utiliza para analizar el cuerpo de las solicitudes entrantes en formato JSON.
app.use(express.json());

//importamos los archivos de rutas para cada modelo
const usuarioRoutes = require('./routes/usuarios');
const ventaRoutes = require('./routes/ventas');
const productoRoutes = require('./routes/productos');
const ingresoRoutes = require('./routes/ingresos');
const egresoRoutes = require('./routes/egresos');

// routes
app.get('/', (req, res) => {
    res.send('welcome');
});
app.use('/', usuarioRoutes);
app.use('/', ventaRoutes);
app.use('/', productoRoutes);
app.use('/', ingresoRoutes);
app.use('/', egresoRoutes);

// conexion a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conectado a la Base de datos de Mongo Atlas"))
.catch((error) => console.error(error)); 

app.listen(port, () => console.log('Servidor en el puerto',port));