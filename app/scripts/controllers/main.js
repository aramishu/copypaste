'use strict';

angular.module('richwebApp')
  .controller('MainCtrl', function ($scope, angularFire, angularFireAuth, FIREBASE_BASE, $location) {
    //$scope.posts = [];
    
    var refPubPosts = new Firebase(FIREBASE_BASE + "/publicPosts");
    angularFire(refPubPosts, $scope, "posts");
    angularFireAuth.initialize(new Firebase(FIREBASE_BASE), {scope: $scope, name: "user"});


    $scope.login = function () {
      angularFireAuth.login("facebook");
    };

    $scope.logout = function () {
      angularFireAuth.logout();
    };

    $scope.$on("angularFireAuth:login", function(evt, user) { // User logged in.
      console.log(user);

      // need to initialise users. annoying "feature" of firebase is that it deletes empty objects. should only be needed when adding the first user.
      var usersRef = new Firebase(FIREBASE_BASE + "/users");
      angularFire(usersRef, $scope, "usersFireObj");
      if(!$scope.usersFireObj) {
        $scope.usersFireObj = {};      }

      var userRef = new Firebase(FIREBASE_BASE + "/users/" + user.uid);
      angularFire(userRef, $scope, "userFireObj");
      //check if new user
      if(!$scope.userFireObj) {
        $scope.userFireObj = {uid: user.uid}; //initialise object
      }
      
      $location.path("home");
    });
    
    $scope.$on("angularFireAuth:error", function(evt, user) { // Auth error event.
      console.log("Error Loggin in or out.");
      //TODO: provide user feedback if wornf password, etc
    });

    $scope.postNewPost = function (_newPost) {
      var now = new Date();
      var newPost = {postid: now.getTime() + $scope.user.id, topic: _newPost.topic, content: _newPost.content};
      newPost.user = {id: $scope.user.id, username: $scope.user.username};
      if(newPost && newPost.content != '') {
        newPost.posted = now.toString();
        newPost.lastEdited = { user: { id: $scope.user.id, username: $scope.user.username}, time: now.toString() };
	
	if(_newPost.public) {
          if(!$scope.posts) $scope.posts = []; 
          $scope.posts.push(newPost);
        } else {
          if(!$scope.userFireObj.posts){
            $scope.userFireObj.posts = [];
          }
          $scope.userFireObj.posts.push(newPost);
        }
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
    
    $scope.makePublic = function (_post) {
      if(!$scope.posts) $scope.posts = [];
      $scope.posts.push($scope.userFireObj.posts.splice(_post, 1)[0]);//splices the element out of the private array and adds it to the public
    };

    $scope.deletePost = function (_post, _posts) {
      _posts.splice(_post, 1);
    }
  });
