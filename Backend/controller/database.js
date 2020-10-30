'use strict';
var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'got-it-and-love-it';

class Database {
    constructor() {
        //Promesas
        mongoose.connect(`mongodb://${servidor}/${db}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            .then(() => {
                console.log('Se conecto a mongo');
            }).catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new Database();