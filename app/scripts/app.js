'use strict';

angular.module('richwebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      })
      .when('/post/:postid', {
        templateUrl: 'views/publicPost.html',
        controller: 'PublicpostCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.constant('FIREBASE_BASE', 'https://copypaste.firebaseio.com/');
;
