"use strict";
//Sets up the use of angular with Aardvark, ngRoute sets up what is viewable in the ng-view portion of the index.
const app = angular.module("Aardvark", ["ngRoute"]);






// This changes the ng-view based on what the ending of the url is
app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: './partials/landing.html',
            controller: 'landingPage'
        })
        .when('/login', {
            templateUrl: './partials/signin.html',
            controller: 'signIn'
        })
        .when('/home', {
            templateUrl: './partials/home.html',
            controller: 'home'
        })
        .when('/addmemory', {
            templateUrl: './partials/addMemory.html',
            controller: 'addMemory'
        })
        .when('/updatememory', {
            templateUrl: './partials/updtMemory.html',
            controller: 'updtMemory'
        })
        .otherwise('/');


});