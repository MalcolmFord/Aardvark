"use strict";
app.controller('memoryCtrl', function($scope, database, $routeParams, userAuth, moment, media) {
    console.log("itemId", $routeParams);

    //this provides the current user's id
    let currentUserId = userAuth.getCurrentUser();
    //empty object for user's input to go
    $scope.memoryContent = {
        image: '',
        message: '',
        userId: currentUserId
    };
    $scope.newImage = {
        image: ''
    };
    //goes to firebase and pulls all of the user's data based on their user id
    const getAllMemories = function() {
        console.log('currentUserId at getAllMemories', currentUserId);

        database.getData(currentUserId)
            .then((items) => {
                $scope.pulledArray = items;

            });
    };
    //pushes a new memory to firebase
    $scope.createMemory = function() {
        console.log('currentUserId at createMemories', currentUserId);

        database.createMemory($scope.memoryContent)
            .then((data) => {

                $scope.uniqueId = data.data.name;
                getAllMemories();
            });
        media.uploadImage($scope.newImage);

    };
    $scope.deleteMemory = function(item) {
        database.deleteMemory(item.id)
            .then(() => {
                getAllMemories();
            });
    };
    //selects the selected memory based on the firebase id

    getAllMemories();
});