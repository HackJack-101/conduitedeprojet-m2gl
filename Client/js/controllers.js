'use strict';
var server = 'http://nodejs.hackjack.info/';
var workshopControllers = angular.module('workshopControllers', []);

workshopControllers.controller('WorkshopListController', ['$scope', '$http', function($scope, $http) {
  $http.get(server + 'workshops').
  then(function(response) {
    $scope.workshops = response.data;
  }, function(error) {
    console.log(error);
  });
  $scope.deleteWorkshop = function(id) {
    $http.delete(server + 'workshops/' + id).
    then(function(response) {
      $http.get(server + 'workshops').
      then(function(response) {
        $scope.workshops = response.data;
      }, function(error) {
        console.log(error);
      });
    }, function(error) {
      console.log(error);
    });
  };
}]);

workshopControllers.controller('WorkshopViewController', function($scope, $http, $routeParams) {
  $http.get(server + 'workshops/' + $routeParams.workshopId).
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
        "seconds": date.getSeconds()
      });
    }
    $scope.workshop = response.data;
  }, function(error) {
    console.log(error);
  });
});

workshopControllers.controller('WorkshopEditController', function($scope, $http, $routeParams, $location) {
  $scope.types = ["Conference", "Atelier", "Projection", "Debat"];
  $scope.workshop = {
    "speakers": [],
    "audience": [],
    "partners": [],
    "timeslots": []
  };
  $http.get(server + 'workshops/' + $routeParams.workshopId).
  then(function(response) {
    $scope.types = ["Conference", "Atelier", "Projection", "Debat"];
    $scope.workshop = response.data;
    $scope.submit = function() {
      $http.put(server + 'workshops/' + $routeParams.workshopId, $scope.workshop)
        .then(function(result) {
          console.log(result);
          $location.path("/workshops");
        }, function(error) {
          console.log(error);
        });
    };
  }, function(error) {
    console.log(error);
  });
});

workshopControllers.controller('WorkshopAddController', function($scope, $http, $routeParams, $location) {
  $scope.types = ["Conference", "Atelier", "Projection", "Debat"];
  $scope.workshop = {
    "speakers": [],
    "audience": [],
    "partners": [],
    "timeslots": []
  };
  $scope.submit = function() {
    $http.post(server + 'workshops/', $scope.workshop)
      .then(function(result) {
        console.log(result);
        $location.path("/workshops");
      }, function(error) {
        console.log(error);
      });
  };
});
