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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  next();
});

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
  workshopModel.find(function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.get('/workshops/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  workshopModel.findById(req.params.id, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/workshops', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var newWorkshop = new workshopModel(req.body);
  newWorkshop.save(function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(req.body));
    }
  });
});

app.put('/workshops/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  workshopModel.update({
    _id: req.params.id
  }, req.body, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(req.body));
    }
  });
});

app.delete('/workshops/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  workshopModel.remove({
    _id: req.params.id
  }, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.listen(9000);
