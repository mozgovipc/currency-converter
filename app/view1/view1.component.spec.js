'use strict';

describe('myApp.view1 module', function() {
  var $componentController;

  beforeEach(module('myApp.view1'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  describe('view1 component', function(){

    it('should create view1 controller', inject(function() {
      var ctrl = $componentController('view1', null, null);
      expect(ctrl).toBeDefined();
    }));

  });
});
