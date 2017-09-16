"use strict";
//Sets up the use of angular with Aardvark, ngRoute sets up what is viewable in the ng-view portion of the index.
const app = angular.module("Aardvark", ["ngRoute", "angularMoment"]);



//This checks to see if the user is logged in, isAuth sets a true of false variable that will be used to check if the route is okay. 

let isAuth = (userAuth) => new Promise((resolve, reject) => {

    userAuth.isAuthenticated()
        .then((userExists) => {
            if (userExists) {
                console.log("Authentication Good");
                resolve();
            } else {
                console.log("Authentication Bad");
                reject();
            }
        });
});


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
            controller: 'home',
            resolve: { isAuth }
        })
        .when('/addmemory', {
            templateUrl: './partials/addMemory.html',
            controller: 'addMemory'
        })
        .when('/updatememory', {
            templateUrl: './partials/updtMemory.html',
            controller: 'updtMemory',
            resolve: { isAuth }
        })
        .when('/details/:itemID', {
            templateUrl: './partials/genericMemory.html',
            controller: 'memoryCtrl',
            resolve: { isAuth }
        })
        .when('/register_new_user', {
            templateUrl: './partials/registerUser.html',
            controller: 'registerUser'
        })
        .when('/user_home', {
            templateUrl: './partials/genericMemory.html',
            controller: 'memoryCtrl',
            resolve: { isAuth }
        })
        .otherwise('/');


});

//Initilazies firebase
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };
    firebase.initializeApp(authConfig);
});