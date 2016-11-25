var app = angular.module('codeBlitzUserCtrls', ['ngCookies']);
app.controller('BodyController', function ($scope, $cookies, $interval, $http) {
	$scope.currentActive = "group_main";
	$scope.currentActiveGroupNo = 1;
	$scope.liveUpTime = 0;
	$scope.liveETA = 7200;
	var liveETAIntervalTriggerLocal = $interval(localTimeUpdate, 1000);
	var liveETAIntervalTriggerServer = $interval(serverTimeSync, 5000);
	function localTimeUpdate(){
		$scope.liveUpTime++;
		$scope.liveETA--;
	}
	function serverTimeSync(){
		$http({
			method: 'GET',
			url: '/time'
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.liveUpTime = response.data.currTime - response.data.startTime
			$scope.liveETA = response.data.endTime - response.data.currTime
		}, function errorCallback(response) {
			console.log("Time-Sync failure occured");
		});
	}
	if (!$cookies.getObject('q_keys'))
		$cookies.putObject('q_keys', { data: [] });

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

app.controller("DetailController", function ($scope, $http, $routeParams, $cookies, $location) {
	$scope.cookieData = $cookies.getObject('q_keys').data;
	$scope.activeQuestionNo = 1;
	$scope.changeQuestion = function(no){
		$scope.activeQuestionNo = no;
	}
	$scope.no = $routeParams.no;
	$scope.group = [];
	$scope.getGroupContent = function () {
		$http({
			method: 'POST',
			url: '/api/games/group/data/no/' + $routeParams.no,
			data: { q_keys: $cookies.getObject('q_keys').data }
		}).then(function successCallback(response) {
			$scope.group = response.data;
		}, function errorCallback(response) {
			alert(response);
		});
	}
	$scope.go = function ( path ) {
		$location.path( path );
	};
	$scope.getGroupContent();
});