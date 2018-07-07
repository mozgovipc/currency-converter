'use strict';

angular
  .module('myApp.fixerIo')
  .factory('fixerIo', ['$resource', '$q', function($resource, $q) {
    var fixerResource = $resource('http://data.fixer.io/api/:resource_id', {
      access_key: 'daf992dd8cd4a2345f677b7feedff113',
    }, {
      latest: {
        method: 'GET',
        params: {
          resource_id: 'latest',
          symbols: ['USD', 'RON'].join(),
        },
      },
      symbols: {
        method: 'GET',
        params: {
          resource_id: 'symbols',
        },
        isArray: true,
        transformResponse: function(data, headersGetter, status) {
          var response = angular.fromJson(data);
          if (status == 200 && response.success && response.symbols) {
            var symbols = Object.keys(response.symbols).map((function(name) {
              return {
                name: name,
                desc: response.symbols[name],
              };
            }));
            return symbols;
          }
          return [];
        },
      },
    });

    var rates = {
      'EUR': 1,
    };

    var base = 'EUR';

    var convert = function(amount, from, to) {
      var fromToBase = 1 / rates[from];
      var rate = fromToBase * rates[to];
      return amount * rate;
    };

    return {
      convert: function(amount, from, to) {
        var symbols = [];
        symbols.push(base);
        if (from != base) {
          symbols.push(from);
        }
        if (to != base) {
          symbols.push(to);
        }

        return $q(function(resolve, reject) {
          fixerResource.latest({symbols: symbols.join()}).$promise.then(function(response) {
            if (response.success && response.rates) {
              rates = response.rates;
              resolve(convert(amount, from, to));
            } else {
              reject('Unexpected server error:' + JSON.stringify(response));
            }
          });
        });
      },
      symbols: function() {
        return fixerResource.symbols();
      },
    };
  }]);
