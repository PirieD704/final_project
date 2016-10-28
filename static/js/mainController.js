// var gameApp = angular.module("gameApp", ['ngRoute', 'ngCookies'])

playerList = [];
var myId = 0;
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location, $rootScope, $timeout, socket){
	var num_ready = 0;
	var apiPath = 'http://10.150.50.55:3000';

	// checkTeam()

	// function checkTeam(){
	// 	if user[i].team
	// }

	socket.on('player_init', function(socket_id){
		console.log("Welcome, fool", socket_id);
		myId = socket_id;
	});

	socket.on('users', function(users){
		playerList = users;
	})

	socket.on('lobby_list_update', function(users){
		var blueTeam = [];
		var redTeam = [];
		for(var i = 0; i < users.length; i++){
			if (users[i].team === 'Blue'){
				blueTeam.push(users[i]);
			}else if (users[i].team === 'Red'){
				redTeam.push(users[i]);
			}else{
				console.log('no team assigned yet');
			}
		}
		$scope.blueTeam = blueTeam;
		$scope.redTeam = redTeam;
		socket.emit('lobby_teams', users);
			console.log('teams are updated');
			if(redTeam.length + blueTeam.length === 2){
				$scope.gameReady = true;
		}
	})

	$scope.start_game = function(){
		num_ready++;
		console.log(num_ready);
		socket.emit('init_game', {
			message: 'players ready', 
			id: myId,
			num_ready: num_ready
		})
		console.log(myId);
	}

	socket.on('player_ready', function(data){
		console.log(data);
		num_ready = data;
	})
	
	socket.on('game_launch', function(users){	
		console.log('game start');
		$location.path('/canvas');	
	})


	socket.on('pong', function(data){
		if(data.id != myId){
			// It's not me who ponged. Move this guy.
			// console.log(data)
			// console.log(playersPresent)
			if(playersPresent){
				for (var i in playersPresent){
				// console.log(playersPresent[key])
					if(playersPresent[i].unique_id == data.id){
						var guyWhoJustPongedAndNotMe = playersPresent[i];
						// console.log(guyWhoJustPongedAndNotMe.player.x);
						// guyWhoJustPongedAndNotMe.y = data.playerY
						guyWhoJustPongedAndNotMe.player.position.x = data.playerX
						guyWhoJustPongedAndNotMe.player.position.y = data.playerY


						// console.log(guyWhoJustPongedAndNotMe)
						// guyWhoJustPongedAndNotMe.player.
						// sprite.body.moveTo(2000, 300, Phaser.ANGLE_RIGHT);
					}
				}
			}
		}
		// for (i in playersPresent){
		// 	if (playersPresent[i].unique_id == data.id){
		// 		console.log(data.message);
		// 	}else{
		// 		console.log('yo')
				// for(i in other_players){
				// 	if(other_players[i].other_player.unique_id == data.id){
				// 		other_players[i].other_player.position.x = data.playerX;
				// 		other_players[i].other_player.position.y = data.playerY;
				// 	}
				// }
		// 	}
		// }
	})

	// registration page 
	$scope.register = function(){
		if($scope.password != $scope.password2){
			$scope.invalidPass = true;
			$rootScope.loggedIn = false;
			$timeout(function(){
				$scope.invalidPass = false;
			}, 1500);
		}else{
			//post request sending these 4 variables to the database
			$http.post(apiPath + '/register', {
				username: $scope.username,
				password: $scope.password,
			}).then(function successCallback(response){
				console.log(response.data);
				if(response.data.name == 'nameTaken'){
					$scope.nameTaken = true;
					$rootScope.loggedIn = false;
					$timeout(function(){
						$scope.nameTaken = false;
					}, 1500);
				}
				if(response.data.message == 'added'){
					//this function goes out to sockets and updates new username
					updateUsername();
					//end socket emit
					$scope.welcome = true;
					$cookies.put('username', $scope.username);
					$rootScope.loggedIn = true;
					$('.navbar-text').text('Signed in as ' + $scope.username);
					$timeout(function(){
						$location.path('/lobby');
						updateLobbyCount();
					}, 1500);
					setTimeout(tutorialModal, 1600);
				}
			}, function errorCallback(response){
				console.log(response);
				
			})
		}	
	};

	//login page
	$scope.login = function(){
		$http.post(apiPath + '/login', {
			username: $scope.username,
			password: $scope.password
		}).then(function successCallback(response){
			if(response.data.success == 'userFound'){
				//this function goes out to sockets and updates new username
				updateUsername();
				//end socket emit
				$scope.welcome = true;
				$cookies.put('username', $scope.username);
				$rootScope.loggedIn = true;
				$('.navbar-text').text('Signed in as ' + $scope.username);
				$timeout(function(){
					$location.path('/lobby');
					updateLobbyCount();
				}, 1500);
			}else if(response.data.failure == 'noUser'){
				$scope.notFound = true;
				$rootScope.loggedIn = false;
				$timeout(function(){
					$scope.notFound = false;
				}, 1500);
			}else if(response.data.failure == 'badPass'){
				$scope.badPass = true;
				$rootScope.loggedIn = false;
				$timeout(function(){
					$scope.badPass = false;
				}, 1500);
			}
		}, function errorCallback(response){
			console.log(response);
		})
	};

	//logout function
	$scope.logout = function(){
		$cookies.remove('username');
		$rootScope.loggedIn = false;
		$location.path('/');
		location.reload();
	};

	// login view
	$scope.toLogin = () => {
		$location.path('/login');
	};

	// register view
	$scope.toRegister = () => {
		$location.path('/');
	};

	// canvas view
	$scope.toCanvas = () => {
		$location.path('/canvas');
	};

	//======================
	// -- TUTORIAL INIT --
	//======================

	function tutorialModal(){
		$('#tutorialModal').modal();
	}

	$scope.help = function(){
		tutorialModal();
		$location.path('/lobby');
	}

	//==================================================
	// SOCKET FUNCTIONS
	//==================================================
	// These are functions we call in the controller to talk to sockets and get data back and forth.
	function updateUsername(){
		//send username to sockets to update username
		username = $scope.username;
		socket.emit('user_to_server', username);
		//end socket emit
	}
	//this tells sockets to prepare to send to all in the lobby, who has entered.
	function updateLobbyCount(){
		for(var i = 0; i < playerList.length; i++){
			if(playerList[i].socketID == myId){
				var lobbyPlayer = playerList[i];
			}
		}
		socket.emit('enter_lobby', {
			id: myId,
			player: lobbyPlayer
		});
		console.log('someone is entering the lobby');
	}
	
		


	//==================================================
	// SOCKET EMITS/ONS
	//==================================================
	// These are global emits/on calls between sockets

})


gameApp.config(($routeProvider) => {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainController'
	}).when('/login',{
		templateUrl: 'views/login.html',
		controller: 'mainController'
	}).when('/lobby',{
		templateUrl: 'views/lobby.html',
		controller: 'mainController'
	}).when('/canvas',{
		templateUrl: 'views/canvas.html',
		controller: 'mainController'
	}).otherwise({
		redirectTo: '/'
	})
})