"use strict";

app.controller('registerUser', function($scope, database, userAuth) {
    let currentUserId = userAuth.getCurrentUser();    //These are the inputs from the user register
    $scope.newUser = {
        first_name: '',
        last_name: '',
        firstMemory: ''
    };

    $scope.email = '';
    $scope.password = '';

    $scope.registerNewUser = function() {
        userAuth.registerUser($scope.email, $scope.password);
        database.createUserProfile($scope.newUser);
    };
});