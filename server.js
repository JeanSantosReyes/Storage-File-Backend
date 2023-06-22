const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear aplicacion de express
const app = express();

global.__basedir = __dirname;

// Coors
app.use(cors());

// Rutas
app.use('/', require('./routes/storage.routes'));

app.use(express.urlencoded({ extended: true }));

// Directorio publico
app.use(express.static('public'));

// Tratar rutas al subir proyecto en un servidor - React
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Escuchar peticion
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});