/*
* autores: Diana Melina y Jesus Salazar
* julio 26, 2023
*/

//Requerimos  express y el modelo usuario
const express = require('express');
const Usuario = require('../models/usuarios');
const router = express.Router();

/** Crear Usuario
 * Creamos la ruta '/crearUsuario'
 * Es un POST que permite crear un nuevo usuario.
 * Los datos del usuario se obtienen del cuerpo de la solicitud (req.body) y se utilizan para crear un nuevo documento "Usuario" que se guarda en la base de datos mediante newUsuario.save().
 */
router.post('/crearUsuario', (req, res) =>{
    const {nombreUsuario, nombre, password, huella}= req.body;
    const newUsuario = new Usuario({
        nombreUsuario: nombreUsuario,
        nombre: nombre,
        password: password,
        huella: huella
      });
    newUsuario.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**  Obtener usuarios
 * Creamos la ruta '/obtenerUsuarios' 
 * Es un GET que permite acceder al los registros existentes en la base de datos
*/
router.get('/obtenerUsuarios', (req, res) => {
    Usuario
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message:error }));
});

module.exports = router;