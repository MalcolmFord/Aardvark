"use strict";

app.factory('database', function($q, $http, FBCreds) {

    //This will push data to firebase



    //This will get data from firebase
    const getData = function() {
        let pulledData = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/.json`)
                .then((itemObject) => {
                    let itemCollection = itemObject.data;
                    console.log('data', itemCollection);
                    console.log('URL', `${FBCreds.databaseURL}/.json`);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        pulledData.push(itemCollection[key]);
                    });
                    console.log('pulledData', pulledData[0]);

                    resolve();
                })
                .catch((error => {
                    reject(error);
                }));
        });
    };



    //This will update data on firebase





    //This will delete data from firebase    


    //This is the array that will be pushed to firebase
    const familyInfo = function(obj) {
        console.log('obj', obj);

        return $q((resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.post(`${FBCreds.databaseURL}/items.json`, newObj)
                .then();
        });
    };

    /*This function, when called, will make a request to firebase to get the
    family id's based on  the user's id.
    */
    let titles = [];
    let userData = [];

    const getNames = function(obj) {
        return Object.keys(obj).map(key => obj[key].title);
    }



    const getFamId = function(user) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/items.json?orderBy="userId"&equalTo="${user}"`) /**/
                .then((items => resolve(getNames(items.data))));
            // userData.push(user.data);
            // console.log('These are the pulled cards', userData);
            // Object.keys(userData).forEach((key) => {
            //     titles.push(userData[key].title);
            // });     

        });
    };

    // const getAllContacts = function(user) {
    //     let contacts = [];
    //     console.log("url is", `${FBCreds.databaseURL}/contacts.json?orderBy="uid"&equalTo="${user}"`);
    //     return $q((resolve, reject) => {
    //             $http.get(`${FBCreds.databaseURL}/contacts.json?orderBy="uid"&equalTo="${user}"`)
    //             .then((itemObject)=>{
    //                 let itemCollection = itemObject.data;
    //                 console.log("itemCollection", itemCollection);
    //                 Object.keys(itemCollection).forEach((key) => {
    //                     itemCollection[key].id = key;
    //                     contacts.push(itemCollection[key]);
    //                 });
    //                 resolve(contacts);
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //         });
    //     };






    return { getData, familyInfo, getFamId, titles, userData };
});