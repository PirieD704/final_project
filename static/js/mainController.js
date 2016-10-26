var gameApp = angular.module("gameApp", ['ngRoute', 'ngCookies'])
gameApp.directive()
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location, $rootScope, $timeout){

	var apiPath = 'http://localhost:3000';
	var socket_users = [];
	
	//registration page 
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

	
	$scope.user = $cookies.get('username');
	console.log($cookies.get('username'));
	console.log($scope.user); 


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