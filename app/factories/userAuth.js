"use strict";

app.factory('userAuth', function($q, $http, database) {
    let currentUser = null;

    //This provides the project with the uid. 
    const isAuthenticated = function() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    console.log('user auth current user', currentUser);

                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    };
    //stores currentUser(the uid) into the getCurrentUser function. 
    const getCurrentUser = function() {
        return currentUser;
    };

    const logOut = function() {
        currentUser = null;
        return firebase.auth().signOut();
    };

    //This is where I'm letting users sign in with google
    let provider = new firebase.auth.GoogleAuthProvider();
   
    const authWithProvider = function() {
        return firebase.auth().signInWithPopup(provider);
    };
    //User register with their personal email and password
    const registerUser = function(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                isAuthenticated();
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    };
    //user login with their personal email and password
    const logIn = function(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                isAuthenticated();
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    };


    return { isAuthenticated, getCurrentUser, logOut, authWithProvider, registerUser, logIn };
});