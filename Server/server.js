var db = require('mongoose');

db.connect('mongodb://localhost/workshops', function(err) {
  if (err) {
    throw err;
  }
});

var workshopSchema = new db.Schema({
  title: String,
  theme: String,
  type: String,
  description: String,
  laboratory: String,
  location: String,
  latitude: Number,
  longitude: Number,
  topics: String,
  website: String,
  capacity: Number,
  duration: Number,
  audience: [String],
  speakers: [String],
  partners: [String],
  timeslots: [Date]
});

var workshopModel = db.model("Workshop", workshopSchema);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var doc = {
  "message": "Documentation",
  "requests": [{
    "http": "GET",
    "url": "/workshops",
    "action": "listing all workshops"
  }, {
    "http": "GET",
    "url": "/workshops/id",
    "action": "display the workshop with this id"
  }, {
    "http": "POST",
    "url": "/workshops",
    "action": "add a workshop"
  }, {
    "http": "PUT",
    "url": "/workshops",
    "action": "mofidy the workshop with this id"
  }, {
    "http": "DELETE",
    "url": "/workshops",
    "action": "delete the workshop with this id"
  }]
};


app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(doc));
});

app.get('/workshops', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('{"message":"Liste des ateliers"}');
});

app.get('/workshops/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('{"message":"Visualiser l\'atelier "' + req.params.id + '}');
});

app.post('/workshops', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var newWorkshop = new workshopModel({"data":"data"});

  newWorkshop.save(function(err) {
    if (err) {
      handleError(res, err);
    } else {
      res.send(JSON.stringify(req.body));
    }
  });
});

app.put('/workshops/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('{"message":"Modifier l\'atelier "' + req.params.id + '}');
});

app.delete('/workshops/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end('{"message":"Supprimer l\'atelier "' + req.params.id + '}');
});

db.connection.close();
app.listen(9000);
