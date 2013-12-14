'use strict';

angular.module('richwebApp')
  .controller('MainCtrl', function ($scope, angularFire, angularFireAuth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var ref = new Firebase("https://copypaste.firebaseio.com/list");
    angularFire(ref, $scope, "awesomeThings");
    angularFireAuth.initialize(ref, {scope: $scope, name: "user"});


    $scope.login = function () {
      angularFireAuth.login("facebook");
    };
  });
