"use strict";

app.factory('database', function($q, $http, FBCreds) {
    //Creates a user profile
    const createUserProfile = function(obj) {
        return $q((resolve, reject) => {
            let newUser = JSON.stringify(obj);
            $http.post(`${FBCreds.databaseURL}/users.json`, newUser)
                .then((obj) => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        });
    };
    //Grabing the user's memories
    const getData = function(user) {
        let items = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/memories.json?orderBy="userId"&equalTo="${user}"`)
                .then((data) => {
                    let itemCollection = data.data;
                    console.log("itemCollection", itemCollection.message);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key] = key;
                        items.push(itemCollection[key].message);
                    });
                    resolve(items)

                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    //Creating a new memory
    const createMemory = function(obj) {
        return $q((resolve, reject) => {
            let newMemory = JSON.stringify(obj);
            $http.post(`${FBCreds.databaseURL}/memories.json`, newMemory)
                .then((obj) => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    //Pushing up the family id and name
    const familyInfo = function(obj) {
        console.log('obj', obj);

        return $q((resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.post(`${FBCreds.databaseURL}/items.json`, newObj)
                .then((data) => {

                    console.log('testData', data);

                    resolve(data);

                });
        });
    };
    //Reteving the user's family list
    const getFamId = function(user) {
        let families = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/items.json?orderBy="userId"&equalTo="${user}"`)
                .then((user) => {
                    console.log('user', user.data);
                    Object.keys(user.data).forEach((key) => {
                        families.push(user.data[key]);
                    });
                    resolve(families);
                })
                .catch(error => reject(error));
        });
    };

    return { getData, familyInfo, getFamId, createUserProfile, createMemory };
});