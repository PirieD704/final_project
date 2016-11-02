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
					Account.update({username: document.username, password: document.password}).exec();
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
var lobby_users = 0;
var game_players = [];
var sockets = [];

io.sockets.on('connect',function(socket){
	socket.emit('player_init', socket.id);
	users.push({
		socketID: socket.id,
		username: 'Anonymous',
		team: ''
	});
	
	//don't assign a team to users until they enter the lobby, this way, no matter the order users on the home page enter
	//they'll still be assigned to the right team and there won't be two people on one team and no people on the other
	socket.on('enter_lobby', function(data){
		for(var i = 0; i < users.length; i++){
			if(users[i].socketID == data.id){
				lobby_users++;
				if (lobby_users % 2 === 0){
					users[i].team = 'Red'
				}else{
					users[i].team = 'Blue'
				}
			}
			console.log(users[i].username + " has been assigned to team " + users[i].team)
		}
		io.sockets.emit('lobby_list_update', users);
			console.log('the lobby list has been updated');
	})
	


	console.log(users)
	console.log('someone has connected via a socket!');
	io.sockets.emit('users', users);

	socket.on('init_game', function(data){
		console.log(data.num_ready, users.length);
		if(data.num_ready == users.length){
			console.log("users are ready");
			io.sockets.emit('game_launch', users);
				console.log('game launching');
			flagCoordinates();
		}else{
			io.sockets.emit('player_ready', data.num_ready);
				console.log('no launch yet');	
		}
	})
	// FINISH THIS 
	// io.sockets.on('start_game'){
	// 	sockets.emit('start_game', {playerTotal: 10})
	// }

	socket.on('ping', function(data){
		// console.log(data.message);
		io.sockets.emit('pong', {
			id: data.id,
			playerX: data.playerX,
			playerY: data.playerY,
			playerRotation: data.playerRotation,
			message: "update move"
		})
	})
	socket.on('get_coord', function(data){
		flagCoordinates();
	})
	socket.on('flag_changed', function(data){
		new_color = data.flag_color;
		io.sockets.emit('flag_color', {
			new_color:new_color
		})
	})
	socket.on('player_ready', function(data){
		//I want this to keep track of how many players are ready to play.
		game_players.push(data.id);
		if(game_players.length == lobby_users){
			io.sockets.emit('replay_init', users);
			flagCoordinates();
		}


	})

	socket.on('disconnect', function(){
		console.log(socket.id + ' has disconnected');
		for(var i = 0; i< users.length; i++){
			if(users[i].socketID == socket.id){
				users.splice(i, 1);
				io.sockets.emit('users', users);
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
function flagCoordinates(){
	flag_x = Math.floor(Math.random() * 1960 + 10);
	flag_y = Math.floor(Math.random() * 1960 + 10);
	io.sockets.emit('flag_coord', {
		flag_x:flag_x,
		flag_y:flag_y
	});
}

module.exports = router;
server.listen(8050);
console.log('listening on port 8080');