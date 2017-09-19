"use strict";
app.controller('memoryCtrl', function($scope, database, $routeParams, userAuth, moment) {
    console.log("itemId", $routeParams);

    //this provides the current user's id
    let currentUserId = userAuth.getCurrentUser();
    //empty object for user's input to go
    $scope.memoryContent = {
        image: '',
        message: '',
        userId: currentUserId,
        id: ''
    };
    //goes to firebase and pulls all of the user's data based on their user id
    const getAllMemories = function() {
        database.getData(currentUserId)
            .then((items) => {
                $scope.pulledArray = items;
            });
    };
    //pushes a new memory to firebase
    $scope.createMemory = function() {
        database.createMemory($scope.memoryContent)
            .then((data) => {
                console.log('data', data.data.name);
                $scope.uniqueId = data.data.name;
                getAllMemories();
            });
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