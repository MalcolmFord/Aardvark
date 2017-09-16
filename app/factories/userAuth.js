"use strict";

app.factory('userAuth', function($q, $http) {
    let currentUser = null;

    //This provides the project with the uid. 
    const isAuthenticated = function() {

        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    console.log("user", user.uid);
                    resolve(true);
                } else {
                    resolve(false);
                }
                return currentUser;
            });
        });
    };
    //stores currentUser(the uid) into the getCurrentUser function. 
    const getCurrentUser = function() {
        return currentUser;
    };

    const logOut = function() {

        return firebase.auth().signOut();
    };

    //This is where I'm letting users sign in with google
    let provider = new firebase.auth.GoogleAuthProvider();

    let authWithProvider = function() {
        return firebase.auth().signInWithPopup(provider);
    };

    const registerUser = function(userObj) {
        firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    };


    return { isAuthenticated, getCurrentUser, logOut, authWithProvider, registerUser };
});