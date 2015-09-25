'use strict';

var workshopControllers = angular.module('workshopControllers', []);

workshopControllers.controller('WorkshopListController', ['$scope', '$http',function($scope, $http) {
  $http.get('http://nodejs.hackjack.info/workshops').
  then(function(response) {
    $scope.workshops = response.data;
    console.log(response)
  }, function(response) {
    console.log(response)
  });
}]);

workshopControllers.controller('WorkshopViewController', function($scope, $http, $routeParams) {
  $http.get('http://nodejs.hackjack.info/workshops/'+$routeParams.workshopId).
  then(function(response) {
    $scope.workshop = response.data;
    console.log(response)
  }, function(response) {
    console.log(response)
  });
});
