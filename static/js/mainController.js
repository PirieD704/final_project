var gameApp = angular.module("gameApp", ['ngRoute', 'ngCookies'])
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location){

	
	//registration page 
	$scope.register = function(){
		console.log($scope.username);
		//post request sending these 4 variables to the database
		$http.post(apiPath + '/register', {
			username: $scope.username,
			password: $scope.password,
			password2: $scope.password2,
			email: $scope.email
		}).then(function successCallback(response){
			console.log(response.data);
			if(response.data.name == 'nameTaken'){
				$scope.nameTaken = true;
			}
			if(response.data.message == 'added'){
				$scope.welcome = true;
				$rootScope.hi.username = $scope.username;
				$cookies.put('username', $scope.username);
				$timeout(function(){
					$location.path('/canvas');
				}, 2500);
			}
		}, function errorCallback(response){
			console.log(response);
			
		})
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

})

gameApp.config(($routeProvider) => {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainController'
	}).when('/login',{
		templateUrl: 'views/login.html',
		controller: 'mainController'
	}).when('/canvas',{
		templateUrl: 'views/canvas.html',
		controller: 'mainController'
	}).otherwise({
		redirectTo: '/'
	})
})