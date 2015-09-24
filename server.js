var express = require('express');

var app = express();

app.get('/workshops', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('{"message":"Liste des ateliers"}');
});

app.get('/workshops/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('{"message":"Visualiser l\'atelier "+ req.params.id}');
});

app.post('/workshops', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('{"message":"Ajouter un atelier"}');
});

app.put('/workshops/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('{"message":"Modifier l\'atelier "+ req.params.id}');
});

app.delete('/workshops/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('{"message":"Supprimer l\'atelier "+ req.params.id}');
});

app.listen(9000);
