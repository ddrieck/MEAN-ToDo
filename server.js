//server.js

	//set up ===============
	var express = require('express');
	var app = express();
	var mongoose = require('mongoose');

	//configuration ========
	
	mongoose.connect('mongodb://ddrieck:gSxEDQS9Zspu@oceanic.mongohq.com:10027/powerful-atoll');

	app.configure(function() {
		app.use(express.static(__dirname + '/public'));
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
	});

	//listen (start app with node server.js) ==================
	app.listen(8080);
	console.log("App listening to port 8080");