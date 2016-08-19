'use strict';

$.noConflict();

angular.module('app', [])
.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.input1 = null;
	$scope.input2 = null;
	$scope.showForm2 = false;
	$scope.showResults = false;
	$scope.data1 = [{
			"id": 1,
			"string": "Mike"
		},
		{
			"id": 2,
			"string": "Rachel"
		},
		{
			"id": 3,
			"string": "Pinchy"
		}
	];
	$scope.data2 = [
		[
			{"string": "hedgehogs and wizards."},
			{"string": "Alice in Wonderland and magic wands."},
			{"string": "parrots, modern art, and knitting."},
		],
		[
			{"string": "dogs and fossils."},
			{"string": "vampires and pigeons."},
			{"string": "monster movies, jump-rope, extravagant period clothes, and checkers."},
		],
		[
			{"string": "skiing, romance movies, and ferrets."},
			{"string": "sandcastles, the Wizard of Oz, and flower-arranging."},
			{"string": "Medieval art and scarves."},
		]
	];


	$scope.query = function() {
		$scope.showForm2 = true;
		
	};

	$scope.query2 = function(value) {
		var index = value - 1;
		$scope.showResults = true;
		$scope.results = $scope.data2[index];
	};

}]);
