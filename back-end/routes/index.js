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

//============================================================
// -- SOCKETS
//============================================================

var socketIo = require('socket.io');
var users = [];
var game_players = [];

io.sockets.on('connect',function(socket){
	console.log(socket.id);
	users.push({
		socketID: socket.id,
		username: 'Anonymous',
		team: ''
	});
	//change users to game_players. this will check who wants to play a game, and then assigns them a team based on the players in the waiting room.
	//this prevents people just looking at the site from being assigned a team and ruining our system. they would be jerks.
	if (users.length % 2 === 0){
		users[users.length -1].team = 'Red'
	}else{
		users[users.length -1].team = 'Blue'
	}
	console.log(users)
	console.log('someone has connected via a socket!');
	io.sockets.emit('users', users);

	socket.on('ping', function(data){
		console.log(data.message);
		io.sockets.emit('pong', {
			id: data.id,
			playerX: data.playerX,
			playerY: data.playerY,
			message: "update move"
		})
	})

	socket.on('disconnect', function(){
		console.log(socket.id + ' has disconnected');
		for(var i = 0; i< users.length; i++){
			if(users[i].socketID == socket.id){
				users.splice(i, 1);
				break;
			}
		}
	})
	//someone just logged in, updating username to sockets.
	socket.on('user_to_server', function(name){
		console.log(socket.id);
		for(var i = 0; i< users.length; i++){
			if(users[i].socketID == socket.id){
				var temp = users[i].username
				users[i].username = name;
				console.log(temp + ' has updated name to ' + users[i].username);
				break;
			}
		}
		io.sockets.emit('users', users);
	})
});	

module.exports = router;
server.listen(8080);
console.log('listening on port 8080');