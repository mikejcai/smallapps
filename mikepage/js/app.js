'use strict';

$.noConflict();

angular.module('app', [])
.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.song_name = null;
	$scope.artist_name = null;
	$scope.showForm2 = false;
	$scope.showResults = false;
	$scope.data1 = [];
	$scope.data2 = [];


	$scope.query = function() {
		
		// display form 2 view
		$scope.showForm2 = true; 

		// query url for form 1
		var url1 = 'http://192.168.1.141:8080/greeting?song_name=' + $scope.song_name + '&artist_name=' + $scope.artist_name;

		// ajax request
		$http.get(url1)
			.then(function(result) {
				$scope.data1 = result.data;
				
			}, function(error){
				console.log("Failed to load data1: " + error);
			});
	};
	
	$scope.query2 = function(value) {
		$scope.showResults = true; // show query result view

		var url2 = '';  // the query url for form 2

		// ajax request
		$http.get(url2)
			.then(function(result) {
				$scope.data2 = result.data;
			}, function(error) {
				console.log('Failed to load data2: ' + error);
			});

	};

}]);
