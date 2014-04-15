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

	//define model ========
	var Todo = mongoose.model('Todo', {
		text : String
	})

	//listen (start app with node server.js) ==================
	app.listen(8080);
	console.log("App listening to port 8080");

// routes =====================================================

	//api
	//get all todos
	app.get('/api/todos', function(req,res){

		//use mongoose to get all todos in the database
		Todo.find(function(err, todos){

				//if there is an error retrieving, send errors.
				if (err)
					res.send(err)

				res.json(todos) //return todos in JSON format
		});
	});

	//create todo, information comes from AJAX request from Angular
	app.post('/api/todos', function(req,res){

		//create a todo, information comes from Angular AJAX
		Todo.create({

			text : req.body.text,
			done : false

		}, function (err, todo) {

			if (err)
				res.send(err);

			Todo.find(function(err, todos){
				if (err)
					res.send(err)
				res.json(todos);
				});
		});
	});

	//delete a todo
	app.delete('/api/todos/:todos_id', function(req,res){
		Todo.remove({
			_id : req.params.todos_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			//get and return all the todos after you create another
			Todo.find(function(err, todos){
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});	
