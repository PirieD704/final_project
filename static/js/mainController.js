var gameApp = angular.module("gameApp", ['ngRoute', 'ngCookies'])
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location){

	$scope.test = "IT WORKS!!!!!"
})