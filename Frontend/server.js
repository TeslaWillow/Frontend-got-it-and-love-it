const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/got-it-and-love-it'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/got-it-and-love-it/' });
});

app.listen(process.env.PORT || 8080);