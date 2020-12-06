const puerto = process.env.PORT || 8888;
const path = require("path");
var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
var database = require('./controller/database');
//Variables de los routers
var usuariosRoutes = require('./routes/usuarios-routes');
var imagenesRoutes = require('./routes/imagenes-routes');
var app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
app.use('/usuarios', usuariosRoutes);
app.use('/imagenes', imagenesRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(puerto, () => {
    console.log(`Servidor del backend levantado en ${puerto}`);
});