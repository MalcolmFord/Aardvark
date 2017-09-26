"use strict";
/*
    ******************************************
    This deals with pushing, pulling, updating,
    and deleting all types of media (except text)
    to and from Firebase
    ******************************************
    */

app.factory('media', function($q, $http, FBCreds) {
    //sends images to the Firebase storage bucket
    const uploadImage = function(image) {
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.storageBucket}/images`, image)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {

                    console.log('upload image error message', error);

                    reject(error);
                });
        });
    };

    return { uploadImage };
});