'use strict';

var workshopApp = angular.module('workshopApp', ['ngRoute', 'ngMaterial', 'workshopControllers']);


workshopApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/workshops-list.html',
      controller: 'WorkshopListController'
    }).
    when('/workshops/view/:workshopId', {
      templateUrl: 'partials/workshops-view.html',
      controller: 'WorkshopViewController'
    }).
    when('/workshops/add/', {
      templateUrl: 'partials/workshops-add.html',
      controller: 'WorkshopAddController'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);
