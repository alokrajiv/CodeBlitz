var app = angular.module('codeBlitzUserRoute', ['ngRoute']);


app.config(function ($routeProvider) {
        $routeProvider.
                when('/user/home', {
                    templateUrl: '/static/html/user/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl'
                }).
                when('/user/show/:no', {
                    templateUrl: '/static/html/user/detail.html',
                    controller: 'DetailController',
                    controllerAs: 'detailCtrl'
                }).
                otherwise({
                    redirectTo: '/user/home'
                })
    })