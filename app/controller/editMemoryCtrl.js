"use strict";
app.controller('editMemoryCtrl', function($scope, database, userAuth, $routeParams) {
    let currentUserId = userAuth.getCurrentUser();
    const getAllMemories = function() {
        database.getData(currentUserId)
            .then((items) => {
                $scope.pulledArray = items;
            });
    };
    //pus



    $scope.editMemory = function(event) {
        let message = $scope.memoryToEdit.message;
        console.log('edit memory event', event);

        $scope.editMemory = {
            id: '',
            image: '',
            message: message,
            userId: currentUserId
        };
    };

    $scope.submitMemory = function() {

        database.editMemory($routeParams.itemId, $scope.editMemory)
            .then(() => {
                getAllMemories();
                window.history.back();
            });
    };

    $scope.newImage = {
        text: '',
        memoryId: $routeParams.itemId
    };
    $scope.submitAssets = function() {
        database.submitAssets($scope.newImage)
            .then(() => {
                getAllMemories();
            });
    };
    const pullSingleMemory = function() {
        database.pullSingleMemory($routeParams.itemId)
            .then((data) => {
                $scope.editMemory = data;
                $scope.editMemory.firebaseId = $routeParams.itemId;
                //connecting the data within the object to the ng-model so the user can edit it


            });
    };
    pullSingleMemory();
});