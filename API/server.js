var express  = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('ev', ['ev']);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(express.static(__dirname + "/public" ));
// app.use(express.static(__dirname + "/node_modules"));
// app.use(express.static(__dirname + "/controller" ));
/*Get API*/
app.get('/getTime', function(req, res){
	db.ev.find(function(err, data){
		res.json(data);
	});
});

app.post('/addTime', function(req, res){
	console.log('req', req.body);
	db.ev.insert(req.body, function(err, data){
		res.json(data);
	});
});

var server = app.listen(4001);
//console.log('server runnit at', server);
