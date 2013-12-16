'use strict';

angular.module('richwebApp')
  .controller('PublicpostCtrl', function ($scope, angularFire, angularFireAuth, FIREBASE_BASE, $routeParams) {
    $scope.postid = $routeParams.postid;
    
    var refPubPosts = new Firebase(FIREBASE_BASE + "/publicPosts");
    angularFire(refPubPosts, $scope, "posts");
  });
