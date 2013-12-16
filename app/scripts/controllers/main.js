'use strict';

angular.module('richwebApp')
  .controller('MainCtrl', function ($scope, angularFire, angularFireAuth, FIREBASE_BASE, $location) {
    //$scope.posts = [];
    
    var ref = new Firebase(FIREBASE_BASE);
    angularFire(ref, $scope, "posts");
    angularFireAuth.initialize(ref, {scope: $scope, name: "user"});


    $scope.login = function () {
      angularFireAuth.login("facebook");
    };

    $scope.logout = function () {
      angularFireAuth.logout();
    };

    $scope.$on("angularFireAuth:login", function(evt, user) { // User logged in.
      console.log("User logged in");
      $location.path("home");
    });
    
    $scope.$on("angularFireAuth:error", function(evt, user) { // Auth error event.
      console.log("Error Loggin in or out.");
      //TODO: provide user feedback if wornf password, etc
    });

    $scope.postNewPost = function (_newPost) {
      var newPost = {topic: _newPost.topic, content: _newPost.content};
      newPost.user = {id: $scope.user.id, username: $scope.user.username};
      if(newPost && newPost.content != '') {
        newPost.posted = new Date().toString();
        newPost.lastEdited = { user: { id: $scope.user.id, username: $scope.user.username}, time: new Date().toString() };
	
        if(!$scope.posts) $scope.posts = []; 
        $scope.posts.push(newPost);

        //clear newPost if successful
        _newPost.topic = '';
        _newPost.content = '';
      } else {console.log("failed to add post");}
    };

    $scope.addNewUser = function (_newUser) {
      angularFireAuth.createUser(_newUser.email, _newUser.pass, function (error, user){
        if(error) {
          console.log("error creating user");
        }
      });
    };

    $scope.login_user = function (_newUser) {
      angularFireAuth.login("password", _newUser);
    };

  });
