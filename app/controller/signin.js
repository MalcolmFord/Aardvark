"use strict";

app.controller('signIn', function($scope, userAuth, $location, $window, database) {
    $scope.createUserProfile = {
        user: '',
        name: '',
        families: [],
        fbID: ''
    };
    /* **********************************************************
        This block of code runs when the user clicks the login with google button. It checks firebase
        to see if the user has an user node on firebase. If not, then it creates one for the user.
        *********************************************************
    */
    const checkForUser = function() {
        userAuth.checkForUser($scope.loggedInUser)
            .then((data) => {
                console.log('logged data', data);

                if (data.length === 0) {
                    console.log("DATA IS NULL");
                    $scope.createUserProfile.user = $scope.loggedInUser;
                    $scope.createUserProfile.name = $scope.displayName;
                    userAuth.createUser($scope.createUserProfile)
                        .then((profile) => {
                            console.log('newProfile', profile);
                            $scope.createUserProfile.fbID = profile.data.name;
                            console.log('$scope.createUserProfile.fbID', $scope.createUserProfile.fbID);
                            userAuth.checkForUserUpdate(profile.data.name, $scope.createUserProfile);
                        });

                } else {
                    console.log('DATA IS NOT NULL', data);

                }
            });
    };
    //This function logs people in with google
    $scope.googleLogin = () => {
        userAuth.authWithProvider()
            .then((result) => {
                console.log('result', result);
                //$window.location.reload();
                $scope.loggedInUser = result.user.uid;
                $scope.displayName = result.user.displayName;
                console.log('$scope.loggedInUser', $scope.loggedInUser);
                checkForUser();
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