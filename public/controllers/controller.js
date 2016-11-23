var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from controller");
	
	var refresh = function() {
		$http.get('/personallist').success(function(response) {
			console.log("Got data!");
			$scope.personallist = response;
		});
	};
	refresh();
	
	$scope.addPersonal = function() {
		$http.post('/personallist', $scope.personal).success(function(response) {
			console.log(response);
			refresh();
		});
	};
	
	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/personallist/' + id).success(function(response) {
			refresh();
		});
	};
	
	$scope.edit = function(id) {
		console.log(id);
		$http.get('/personallist/' + id).success(function(response) {
			$scope.personal = response;
		});
	};
	
	$scope.update = function() {
		console.log($scope.personal._id);
		$http.put('/personallist/' + $scope.personal._id, $scope.personal).success(function(response) {
			refresh();
		});
	};
	
	$scope.deselect = function() {
		$scope.personal = "";
	};
}]);