"use strict";

app.controller('signIn', function($scope, userAuth, $location, $window) {
    //This function logs people in with google
    $scope.googleLogin = () => {
        userAuth.authWithProvider()
            .then((result) => {
                let user = result.user.uid;


                $window.location.href = '#!/home';


            });
    };
});