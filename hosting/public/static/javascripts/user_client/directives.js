var app = angular.module('codeBlitzUserDrtvs', []);

app.directive('groupList', function () {
        return{
            restrict: 'E',
            templateUrl: '/static/html/admin/group_main.html',
            link: function(scope, elem, attrs){
            }
        }
})
app.directive('groupContent', function () {
        return{
            restrict: 'E',
            templateUrl: '/static/html/admin/group_content.html',
            link: function(scope, elem, attrs){
            }
        }
})