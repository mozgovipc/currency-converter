'use strict';

angular
  .module('myApp.view1')
  .component('view1', {
    templateUrl: 'view1/view1.html',
    controller: ['fixerIo', function(fixerIo) {
      var ctrl = this;

      ctrl.amount = 1.0;
  
      ctrl.symbols = fixerIo.symbols();

      ctrl.symbols.$promise.then((function() {
        fixerIo
          .convert(1, 'CAD', 'USD')
          .then(function(result) {
            console.log(result);
          })
          .catch(function(reson) {
            console.log(reson);
          });
      }));
    }],
  });
