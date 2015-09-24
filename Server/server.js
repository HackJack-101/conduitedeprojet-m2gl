var express = require('express');

var app = express();

var doc = {
"message":"Documentation",
"requests":
    [
        {"http":"GET","url":"/workshops","action":"listing all workshops"},
        {"http":"GET","url":"/workshops/id","action":"display the workshop with this id"},
        {"http":"POST","url":"/workshops","action":"add a workshop"},
        {"http":"PUT","url":"/workshops","action":"mofidy the workshop with this id"},
        {"http":"DELETE","url":"/workshops","action":"delete the workshop with this id"}
    ]
};


app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(doc));
});

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
