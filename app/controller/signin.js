"use strict";

app.controller('signIn', function($scope, userAuth, $location, $window, database) {

    //This function logs people in with google
    $scope.googleLogin = () => {
        userAuth.authWithProvider()
            .then((result) => {
                console.log('result', result);
                $window.location.reload();
            })
            .catch((error) => {
                console.log("error with google login");
                let errorCode = error.code;
                console.log('error with google login', error.message);

                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });
    };
    $scope.logIn = function() {
        $scope.logIn = {};
        $scope.email = "";
        $scope.password = "";
        userAuth.logIn($scope.email, $scope.password);
    };

    $scope.reloadRoute = function() {
        $window.location.reload();
    };
});