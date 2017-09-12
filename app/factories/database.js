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









    return { getData };
});