const puerto = 8888;
var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
//var database = require('./controller/database'); 
//Variables de los routers
//var collectionRouter = require('./routes/collection-routers');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
//app.use('/someNameRoutes', collectionRouter);

app.listen(puerto, () => {
    console.log(`Servidor del backend levantado en ${puerto}`);
});