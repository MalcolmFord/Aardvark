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

    $scope.registerNewUser = function() {
        userAuth.registerUser($scope.emailAndPassword);
        database.createUserProfile($scope.newUser);

    };
});