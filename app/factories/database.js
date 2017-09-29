"use strict";

app.factory('database', function($q, $http, FBCreds) {
    //Creates a user profile
    const createUserProfile = function(obj) {
        return $q((resolve, reject) => {
            let newUser = JSON.stringify(obj);
            $http.post(`${FBCreds.databaseURL}/users.json`, newUser)
                .then((obj) => {
                    console.log('object', obj);

                    resolve(obj);
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
                    console.log('Item collection database', itemCollection);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        items.push(itemCollection[key]);

                    });
                    resolve(items);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    //Creating a new memory
    const createMemory = function(obj) {
        let newMemory = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/memories.json`, newMemory)
            .then((obj) => {
                console.log('create memory on database', obj);
                return obj;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };
    const editMemory = function(id, message) {
        return $q((resolve, reject) => {
            let newMessage = JSON.stringify(message);
            console.log('edit id ', id, newMessage);


            $http.patch(`${FBCreds.databaseURL}/memories/${id}.json`, newMessage)
                .then((data) => {

                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const submitAssets = function(obj) {
        return $q((resolve, reject) => {
            let newMessage = JSON.stringify(obj);
            console.log('newMessage', newMessage);
            $http.post(`${FBCreds.databaseURL}/assets`, newMessage)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });


        });
    };
    const deleteMemory = function(id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/memories/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const pullSingleMemory = function(id) {
        console.log('pull single memory database id', id);

        return $q((resolve, reject) => {
            console.log('pull single memory id', `${FBCreds.databaseURL}/memories/${id}.json`);

            $http.get(`${FBCreds.databaseURL}/memories/${id}.json`)
                .then((itemObj) => {
                    // [Object.keys(itemObj)[0]]
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    //Pushing up the family id and name
    const familyInfo = function(obj) {

        return $q((resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.post(`${FBCreds.databaseURL}/families.json`, newObj)
                .then((data) => {
                    console.log('create family data', data.data.name);
                    resolve(data.data.name);
                });
        });
    };
    //Immedeatily updating the families data.
    const updateImmediately = function(id, message) {
        return $q((resolve, reject) => {
            let newMessage = JSON.stringify(message);
            $http.patch(`${FBCreds.databaseURL}/families/${id}.json`, newMessage)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    // Reteving the user 's family list
    const getFamilies = function(user) {
        let families = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/families.json?orderBy="userId"&equalTo="${user}"`)
                .then((user) => {
                    Object.keys(user.data).forEach((key) => {
                        families.push(user.data[key]);
                    });
                    resolve(families);
                })
                .catch(error => reject(error));
        });
    };
    const findFamily = function(obj) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/families/${obj}.json`)
                .then((itemObj) => {
                    console.log('personal family obj', itemObj);

                    resolve(itemObj);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const postFamilyMemory = function(id, memory) {
        let newMemory = JSON.stringify(memory);
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.databaseURL}/familyMemory.json`, newMemory)
                .then((data) => {
                    console.log('This is what was posted to the family board', data);
                    resolve(data.data.name);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const updateFamilyDataImmediately = function(id, message) {
        return $q((resolve, reject) => {
            let newMessage = JSON.stringify(message);
            $http.patch(`${FBCreds.databaseURL}/familyMemory/${id}.json`, newMessage)
                .then((data) => {
                    resolve(data.data.name);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const pullAllMemories = function(id) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/familyMemory.json?orderBy="familyId"&equalTo="${id}"`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const pullSingleFamilyMemory = function(id) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/familyMemory/${id}.json`)
                .then((data) => {
                    console.log('single family', data);

                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const updateFamilyMemory = function(id, message) {
        return $q((resolve, reject) => {
            let newMessage = JSON.stringify(message);
            $http.patch(`${FBCreds.databaseURL}/familyMemory/${id}.json`, newMessage)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const deleteFamMemory = function(id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/familyMemory/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const joinFamily = function(id, array) {
        let newArray = JSON.stringify(array);
        return $q((resolve, reject) => {
            $http.patch(`${FBCreds.databaseURL}/users/${id}.json`, newArray)
                .then((data) => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const pullUserInfo = function(user) {
        let id = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="user"&equalTo="${user}"`)
                .then((profile) => {
                    let itemCollection = profile.data;
                    console.log('pulled user profile', itemCollection);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        id.push(itemCollection[key]);
                        console.log('id', id);
                    });
                    resolve(id);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const updateUserProfile = function(user, message) {
        return $q((resolve, reject) => {
            let newMessage = JSON.stringify(message);
            $http.patch(`${FBCreds.databaseURL}/users/${user}.json`, newMessage);
        });
    };
    return {
        getData,
        createUserProfile,
        createMemory,
        editMemory,
        submitAssets,
        pullSingleMemory,
        deleteMemory,
        getFamilies,
        familyInfo,
        findFamily,
        updateImmediately,
        pullAllMemories,
        postFamilyMemory,
        updateFamilyDataImmediately,
        pullSingleFamilyMemory,
        updateFamilyMemory,
        deleteFamMemory,
        joinFamily,
        pullUserInfo,
        updateUserProfile
    };
});