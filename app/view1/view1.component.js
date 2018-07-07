'use strict';

angular
  .module('myApp.view1')
  .component('view1', {
    templateUrl: 'view1/view1.html',
    controller: ['fixerIo', function(fixerIo) {
      var ctrl = this;

      ctrl.amount = 1.0;
      ctrl.result = 'converting...';
      ctrl.from = {name: 'EUR'};
      ctrl.to = {name: 'USD'};

      ctrl.symbols = fixerIo.symbols();
      ctrl.symbols.$promise.then((function() {
        // initial convertion, done after the symbols are loaded
        ctrl.convert();
      }));

      ctrl.convert = function() {
        ctrl.result = 'converting...';
        var amount = parseFloat(ctrl.amount);
        fixerIo
          .convert(amount, ctrl.from.name, ctrl.to.name)
          .then(function(result) {
            ctrl.result = result.toFixed(4);
          })
          .catch(function(reson) {
            ctrl.result = result;
          });
      };
    }],
  });
