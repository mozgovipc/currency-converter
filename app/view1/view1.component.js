'use strict';

angular
  .module('myApp.view1')
  .component('view1', {
    templateUrl: 'view1/view1.html',
    controller: ['fixerIo', function(fixerIo) {
      var ctrl = this;

      ctrl.amount = 1.0;
  
      fixerIo.latest().$promise.then(function(data) {
        ctrl.rates = data.rates;
        ctrl.base = data.base;
      });

      fixerIo.symbols().$promise.then(function(data) {
        ctrl.symbols = Object.keys(data.symbols).map((function(name) {
          return {
            name: name,
            desc: data.symbols[name],
          };
        }))
      });
    }],
  });
