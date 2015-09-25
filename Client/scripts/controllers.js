var app = angular.module('WorkshopApp', ['ngMaterial']);

app.controller('WorkshopController', function($scope, $http) {
  $http.get('http://nodejs.hackjack.info/workshops').
  then(function(response) {
    $scope.workshops = response.data;
    console.log(response)
  }, function(response) {
    console.log(response)
  });
});
