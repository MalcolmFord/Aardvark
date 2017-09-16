"use strict";

app.controller('registerUser', function($scope, database, userAuth) {
    //These are the inputs from the user register
    $scope.newUser = {
        first_name: '',
        last_name: '',
        firstMemory: ''
    };
    $scope.emailAndPassword = {
        email: '',
        password: ''
    };
    console.log('new user', $scope.newUser);

    $scope.registerNewUser = function() {
        userAuth.registerUser($scope.emailAndPassword);
        database.createUserProfile($scope.newUser);
        console.log('new new user', $scope.newUser);

    };
});