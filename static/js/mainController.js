var gameApp = angular.module("gameApp", ['ngRoute', 'ngCookies'])
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location){

	
	$scope.toCanvas = () => {
		$location.path('/canvas');
	}

})

gameApp.config(($routeProvider) => {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainController'
	}).when('/canvas',{
		templateUrl: 'views/canvas.html',
		controller: 'mainController'
	}).otherwise({
		redirectTo: '/'
	})
})