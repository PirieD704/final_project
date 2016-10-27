// var gameApp = angular.module("gameApp", ['ngRoute', 'ngCookies'])

playerList = {};
myId = 0;
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location, $rootScope, $timeout, socket){

	var apiPath = 'http://localhost:3000';
	var socket_users = [];

	socket.on('users', function(users){
		var blueTeam = [];
		var redTeam = [];
		for(var i = 0; i < users.length; i++){
			playerList[i] = users[i];
			if (myId == 0){
				myId = users[users.length -1].socketID;
			}
		}
		for(var i = 0; i < socket_users.length; i++){
			if (socket_users[i].team === 'Blue'){
				blueTeam.push(socket_users[i]);
				console.log(blueTeam)
			}else if (socket_users[i].team === 'Red'){
				redTeam.push(socket_users[i]);
				console.log(redTeam)
			}else{
				console.log('error - no team');
			}
		}
		$scope.blueTeam = blueTeam;
		$scope.redTeam = redTeam;
	})
	socket.on('pong', function(data){
		for (i in playersPresent){
			if (playersPresent[i].unique_id == data.id){
				console.log(data.message);
			}else{
				console.log('yo')
				// for(i in other_players){
				// 	if(other_players[i].other_player.unique_id == data.id){
				// 		other_players[i].other_player.position.x = data.playerX;
				// 		other_players[i].other_player.position.y = data.playerY;
				// 	}
				// }
			}
		}
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
					}, 1500);
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