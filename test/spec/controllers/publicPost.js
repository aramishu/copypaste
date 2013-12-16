'use strict';

describe('Controller: PublicpostCtrl', function () {

  // load the controller's module
  beforeEach(module('richwebApp'));

  var PublicpostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicpostCtrl = $controller('PublicpostCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
