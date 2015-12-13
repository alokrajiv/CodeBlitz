var app = angular.module('codeBlitzUserCtrls', ['ngCookies']);
app.controller('BodyController', function ($scope, $cookies) {
	if (!$cookies.getObject('q_keys'))
		$cookies.putObject('q_keys', { data: [] })

});
app.controller("HomeController", function ($scope, $http, $cookies, $window) {
	$scope.keyChain = $cookies.getObject('q_keys').data;

	var now = new Date();
	now.setDate(now.getDate() + 7);
	$scope.clearKeyChain = function () {
		$cookies.putObject('q_keys', { data: [] })
		$scope.keyChain = $cookies.getObject('q_keys').data;
		$scope.getGroupList();
	}
	$scope.new_q_key = "";
	$scope.groups = [];
	$scope.addQKey = function () {
		var q_keys = $cookies.getObject('q_keys').data;
		q_keys.push($scope.new_q_key);
		$cookies.putObject('q_keys', { data: q_keys }, {
            expires: now
        });
		$scope.new_q_key = "";
		$scope.getGroupList();
		$scope.keyChain = $cookies.getObject('q_keys').data;
	}
	$scope.getGroupList = function () {
		$scope.keyChain = $cookies.getObject('q_keys').data;
		$http({
			method: 'POST',
			url: '/api/games/groups/data',
			data: { q_keys: $cookies.getObject('q_keys').data }
		}).then(function successCallback(response) {
			$scope.groups = response.data;
		}, function errorCallback(response) {
			alert(response);
		});
	}
	$scope.getGroupList();
});

app.controller("DetailController", function ($scope, $http, $routeParams, $cookies) {
	$scope.cookieData = $cookies.getObject('q_keys').data;
	$scope.no = $routeParams.no;
	$scope.group = [];
	$scope.getGroupContent = function () {
		$http({
			method: 'POST',
			url: '/api/games/group/data/no/' + $routeParams.no,
			data: { q_keys: $cookies.getObject('q_keys').data }
		}).then(function successCallback(response) {
			$scope.group = response.data;
			console.log($scope.group);
		}, function errorCallback(response) {
			alert(response);
		});
	}
	$scope.getGroupContent();
});