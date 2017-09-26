"use strict";

app.controller('navCtrl', function($scope, userAuth, $window) {
    $scope.logout = function() {
        // console.log('You clicked logged out');

        // userAuth.logout()
        //     .then(() => {
        //         userAuth.isAuthenticated();
        //     });

        console.log('we go this far');
        userAuth.logOut()
            .then(() => {
                userAuth.isAuthenticated();
            });



    };
    $scope.loggedIn = userAuth.getCurrentUser();
    console.log('nav bar logged in');


    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            console.log("currentUser logged in?", user);
            console.log("logged in t-f", $scope.isLoggedIn);
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            console.log("user logged in?", $scope.isLoggedIn);
            $window.location.href = "#!/";
        }
    });
    $scope.reloadRoute = function() {
        $window.location.reload();
    };


});