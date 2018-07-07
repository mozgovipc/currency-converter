'use strict';

angular
  .module('myApp.view1')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      template: '<view1></view1>',
    });
  }]);
