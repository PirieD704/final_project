var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/finalGame';
var Account = require('../models/accounts');
var http = require('http');
var fs = require('fs');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

mongoose.connect(mongoUrl);

// include bcrypt to store hashed pass
var bcrypt = require('bcrypt-nodejs');


//============================================================
// -- CREATE A SERVER
//============================================================
var server = http.createServer(function(req, res){
	fs.readFile('index.html', 'utf-8', function(error, data){
		// console.log(error);
		// console.log(data);
		if(error){
			res.writeHead(500,{'content-type': 'text/html'})
			res.end(error);
		}else{
			res.writeHead(200,{'content-type':'text/html'});
			res.end(data);
		}
	})
})

router.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

//register page
router.post('/register', function(req, res, next){
	console.log('this happened');
	Account.findOne(
		{username: req.body.username},
		function(error, document){
			if(document != null){
				res.json({name: 'nameTaken'});
			}else{
					var accountToAdd = new Account({
						username: req.body.username,
						password: bcrypt.hashSync(req.body.password)
					});
					accountToAdd.save(function(error, documentAdded){
						console.log(error);
						if(error){
							res.json({ message: 'errorAdding'})
						}else{
							res.json({message: 'added', username: req.body.username});
						}
					});	
				}				
			}
		)
});

//login page
router.post('/login', function(req, res, next){
	Account.findOne(
		{username: req.body.username}, //this is the droid we're looking for
		function(error, document){

			if(document == null){
				//no match
				res.json({failure:'noUser'});
			}else{
				var loginResult = bcrypt.compareSync(req.body.password, document.password);
				if(loginResult){
					Account.update({username: document.username}).exec();
					res.json({success:'userFound', username: document.username,});
					loggedIn = true;
				}else{
					res.json({failure: 'badPass'});
				}
			}
		}
	)
});

var socketIo = require('socket.io');

io.sockets.on('connect',function(socket){
	console.log(socket.id);
	socketUsers.push({
		socketID: socket.id,
		name: 'Anonymous'
	})
	io.sockets.emit('users', socketUsers);

	console.log('someone has connected via a socket!');
	socket.on('message_to_server', function(data){
		io.sockets.emit('message_to_client', {
			message: data.message,
			name: data.name,
			date: data.date
		})
	})
});	

module.exports = router;
