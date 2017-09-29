"use strict";

app.factory('userAuth', function($q, $http, database, FBCreds) {
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
    const checkForUser = function(user) {
        let id = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="user"&equalTo="${user}"`)
                .then((data) => {
                    console.log('check for user data', data);
                    let itemCollection = data.data;
                    console.log('check for user profile', itemCollection);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        id.push(itemCollection[key]);

                    });
                    console.log('id"s', id);
                    resolve(id);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const createUser = function(userObject) {
        let newUserObject = JSON.stringify(userObject);
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.databaseURL}/users.json`, newUserObject)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const updateUserProfile = function(user, object) {
        let newObject = JSON.stringify(object);
        $q((resolve, reject) => {
            $http.patch(`${FBCreds.databaseURL}/users?orderBy="user"&equalTo="${user}"`, newObject)
                .then((data) => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const checkForUserUpdate = function(id, message) {
        let newMessage = JSON.stringify(message);
        $q((resolve, reject) => {
            $http.patch(`${FBCreds.databaseURL}/users/${id}.json`, newMessage)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    return {
        isAuthenticated,
        getCurrentUser,
        logOut,
        authWithProvider,
        registerUser,
        logIn,
        checkForUser,
        createUser,
        updateUserProfile,
        checkForUserUpdate
    };
});