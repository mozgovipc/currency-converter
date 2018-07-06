'use strict';

angular
  .module('myApp.view1')
  .component('view1', {
    templateUrl: 'view1/view1.html',
    controller: ['fixerIo', function(fixerIo) {
      var ctrl = this;
  
      fixerIo.latest().$promise.then(function(data) {
        console.log(data);
        ctrl.rates = data.rates;
        ctrl.base = data.base;
      });
    }],
  });
