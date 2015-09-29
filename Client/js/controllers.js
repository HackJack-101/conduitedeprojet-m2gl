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
      $scope.timeslots.push(date.toLocaleString());
    }
    $scope.workshop = response.data;
  }, function(error) {
    console.log(error);
  });
});

workshopControllers.controller('WorkshopEditController', function($scope, $http, $routeParams, $location) {
  $scope.types = ["Conférence", "Atelier", "Projection", "Débat"];
  $scope.workshop = {
    "speakers": [],
    "audience": [],
    "partners": [],
    "timeslots": []
  };
  $http.get(server + 'workshops/' + $routeParams.workshopId).
  then(function(response) {
    $scope.types = ["Conférence", "Atelier", "Projection", "Débat"];
    for (var i = 0; i < response.data.timeslots.length; i++) {
      var date = new Date(response.data.timeslots[i])
      response.data.timeslots[i] = date.toLocaleString();
    }
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
  $scope.types = ["Conférence", "Atelier", "Projection", "Débat"];
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
