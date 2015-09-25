'use strict';

var workshopControllers = angular.module('workshopControllers', []);

workshopControllers.controller('WorkshopListController', ['$scope', '$http', function($scope, $http) {
  $http.get('http://nodejs.hackjack.info/workshops').
  then(function(response) {
    $scope.workshops = response.data;
    console.log(response)
  }, function(response) {
    console.log(response)
  });
}]);

workshopControllers.controller('WorkshopViewController', function($scope, $http, $routeParams) {
  $http.get('http://nodejs.hackjack.info/workshops/' + $routeParams.workshopId).
  then(function(response) {
    $scope.timeslots = [];
    for (var i = 0; i < response.data.timeslots.length; i++) {
      var date = new Date(response.data.timeslots[i]);
      $scope.timeslots.push({
        "day": date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        "month": date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        "year": date.getFullYear(),
        "hours": date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        "minutes": date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        "seconds": date.getSeconds(),
      });
    }
    $scope.workshop = response.data;

    console.log(response)
  }, function(response) {
    console.log(response)
  });
});

workshopControllers.controller('WorkshopAddController', function($scope, $http, $routeParams) {});
