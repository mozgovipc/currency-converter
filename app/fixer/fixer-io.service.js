'use strict';

angular
  .module('myApp.fixerIo')
  .factory('fixerIo', ['$resource', function($resource) {
    return $resource('http://data.fixer.io/api/:resource_id', {
      access_key: 'daf992dd8cd4a2345f677b7feedff113',
    }, {
      latest: {
        method: 'GET',
        params: {
          resource_id: 'latest',
          symbols: ['USD', 'RON'].join(),
        },
        transformResponse: function(data, headersGetter, status) {
          var response = angular.fromJson(data);
          response.rates = Object.keys(response.rates).map(function(symbol) {
            return {
              symbol: symbol,
              value: response.rates[symbol],
            };
          });
          return response;
        },
      },
    });
  }]);
