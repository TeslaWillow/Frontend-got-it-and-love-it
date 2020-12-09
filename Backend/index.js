const puerto = process.env.PORT || 8888;
const path = require("path");
var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
var database = require('./controller/database');
//Variables de los routers
var usuariosRoutes = require('./routes/usuarios-routes');
var imagenesRoutes = require('./routes/imagenes-routes');
var planesRoutes = require('./routes/planes-route');
var empresasRoutes = require('./routes/empresas-routes');
var tipoUsuarioRoutes = require('./routes/tipousuario-router');
var categoriasRoutes = require('./routes/categorias-routes');
var productosRoutes = require('./routes/productos-routes');
var comprasRoutes = require('./routes/compras-routes');
var bancoArchivosRoutes = require('./routes/bancoarchivos-routes');
var loginRoutes = require('./routes/login-routes');
//Middleware
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
app.use('/usuarios', usuariosRoutes);
app.use('/imagenes', imagenesRoutes);
app.use('/planes', planesRoutes);
app.use('/empresas', empresasRoutes);
app.use('/tipoUsuario', tipoUsuarioRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes);
app.use('/compras', comprasRoutes);
app.use('/bancoarchivos', bancoArchivosRoutes);
app.use('/login', loginRoutes);
// Static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(puerto, () => {
    console.log(`Servidor del backend levantado en ${puerto}`);
});