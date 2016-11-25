var app = angular.module('codeBlitzAdminCtrls', []);
app.controller('BodyController', function ($scope) {
	this.base = "MOOSA";
	$scope.currentActive = "group_main";
	$scope.currentActiveGroupNo = 1;
});
app.controller("GroupsController", function ($scope, $http) {
	$http({
				method: 'GET',
				url: '/time'
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.startDate = new Date(response.data.startTime*1000);
				$scope.endDate = new Date(response.data.endTime*1000);
				$scope.parseStartDate();
				$scope.parseEndDate();				
			}, function errorCallback(response) {
				alert(response);
			});
	$scope.parseStartDate = function(){	
		$scope.parsedStartDate = Math.floor(new Date($scope.startDate).getTime()/1000);
	}
	$scope.parseEndDate = function(){
		$scope.parsedEndDate = Math.floor(new Date($scope.endDate).getTime()/1000);
	}
	$scope.updateTime = function(){
		$http({
			method: 'POST',
			url: '/api/admin/groups/time',
			data: {
				"newTime": {
					"eventName": "CodeBlitz",
					"startTime": $scope.parsedStartDate,
					"endTime": $scope.parsedEndDate
				}
				
			}
		}).then(function successCallback(response) {
			alert('Time Updated')
		}, function errorCallback(response) {
			alert(response);
			
		});
	}
	$scope.groups = [];
	$scope.getGroupList = function () {
		$http({
			method: 'GET',
			url: '/api/admin/groups/all'
		}).then(function successCallback(response) {
			$scope.groups = response.data;
		}, function errorCallback(response) {
			alert(response);
			
		});
	}
	$scope.getGroupList();
	$scope.newGroup = null;
	$scope.newGroupIsEmpty = function () {
		if ($scope.newGroup)
			return false;
		else
			return true;
	}
	function isNormalInteger(str) {
		var n = ~~Number(str);
		return String(n) === str && n >= 0;
	}
	$scope.editGroup = function (no) {
		console.log(parseInt(no));
		$scope.$parent.currentActive = "group_content";
		$scope.$parent.currentActiveGroupNo = parseInt(no);
		$scope.$parent.getGroupContent();
		console.log($scope.$parent.currentActiveGroupNo);
	}
	$scope.addGroup = function () {
		$scope.newGroup.groupNo = parseInt($scope.newGroup.groupNo);
		var userConfirmDelete = confirm("Are you sure you want to add new Group ");
		if (userConfirmDelete) {
			$http({
				method: 'POST',
				url: '/api/admin/groups/add',
				data: { newGroup: $scope.newGroup }
			}).then(function successCallback(response) {
				$scope.groups = response.data;
				$scope.newGroup = null;
				$scope.getGroupList();
			}, function errorCallback(response) {
				alert(response);
			});
		}
		else {

		}
	}
	$scope.deleteGroup = function (no) {
		var userConfirmDelete = confirm("Are you sure you want to delete GroupNo " + no);
		if (userConfirmDelete) {
			$http({
				method: 'DELETE',
				url: '/api/admin/groups/no/' + no
			}).then(function successCallback(response) {
				$scope.groups = response.data;
				$scope.getGroupList();
			}, function errorCallback(response) {
				alert(response);
			});
		}
		else {

		}
	}
});

app.controller("GroupContentController", function ($scope, $http) {
	$scope.group = {};
	$scope.groupList = function () {
		$scope.$parent.currentActive = "group_main";
	}
	$scope.newPassword = "";
	$scope.updatePassword = function(){
		$http({
			method: 'POST',
			url: '/api/admin/groups/changePassword/no/' + $scope.$parent.currentActiveGroupNo,
			data: { "newPassword": $scope.newPassword}
		}).then(function successCallback(response) {
			$scope.group = response.data;
			$scope.$parent.getGroupContent();
			$scope.newPassword = "";
		}, function errorCallback(response) {
			alert(response);
		});
	}
	$scope.$parent.getGroupContent = function () {
		
		console.log("getting" + $scope.$parent.currentActiveGroupNo);
		$http({
			method: 'GET',
			url: '/api/admin/groups/no/' + $scope.$parent.currentActiveGroupNo
		}).then(function successCallback(response) {
			$scope.group = response.data;
			console.log($scope.group);
		}, function errorCallback(response) {
			alert(response);
		});
	}
	$scope.newQuestion = null;
	$scope.newQuestionIsEmpty = function () {
		if ($scope.newQuestion)
			return false;
		else
			return true;
	}
	function isNormalInteger(str) {
		var n = ~~Number(str);
		return String(n) === str && n >= 0;
	}
	$scope.addQuestion = function () {
		$scope.newQuestion.questionNo = parseInt($scope.newQuestion.questionNo);
		var userConfirmDelete = confirm("Are you sure you want to add new Group ");
		if (userConfirmDelete) {
			$http({
				method: 'POST',
				url: '/api/admin/groups/no/' + $scope.group.groupNo + '/question/add',
				data: { newQuestion: $scope.newQuestion }
			}).then(function successCallback(response) {
				$scope.groups = response.data;
				$scope.newQuestion = null;
				$scope.getGroupContent();
			}, function errorCallback(response) {
				alert(response);
			});
		}
		else {

		}
	}
	$scope.deleteQuestion = function (no) {
		var userConfirmDelete = confirm("Are you sure you want to delete GroupNo " + no);
		if (userConfirmDelete) {
			$http({
				method: 'DELETE',
				url: '/api/admin/groups/no/' + $scope.group.groupNo + '/question/no/' + no
			}).then(function successCallback(response) {
				$scope.groups = response.data;
				$scope.getGroupContent();
			}, function errorCallback(response) {
				alert("ERROR!!! -->" + response);
			});
		}
		else {

		}
	}
});