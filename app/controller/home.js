"use strict";

app.controller('home', function($scope) {
    //This function will take the value of the user's family name and send it over to the factory
    //which will then send that name to firebase.
    $scope.createFamily = function() {
        let famId = [];
        $scope.newFamId = Math.floor(Math.random() * 9999999);

    };
});