var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('personallist', ['personallist']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/personallist', function(req, res) {
	console.log("I received a GET request");
	
	db.personallist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post("/personallist", function(req, res) {
	console.log(req.body);
	db.personallist.insert(req.body, function (err, docs) {
		res.json(docs);
	});
});

app.delete('/personallist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.personallist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/personallist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.personallist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/personallist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.personallist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {type: req.body.type, edu: req.body.edu, skill: req.body.skill, project: req.body.project}},
		new: true
	}, function (err, doc) {
		res.json(doc);
	});
});

app.listen(8080);
console.log("Server running on port 8080");