"use strict";

app.controller('genFamPage', function($scope, $routeParams, database, userAuth) {
    $scope.newMemory = {
        text: '',
        familyId: '',
        userId: '',
        id: ''
    };
    //This is assiging the family Id to the new memory
    $scope.newMemory.familyId = $routeParams.itemID;
    //This is addinging the user Id to the new memory
    $scope.newMemory.userId = userAuth.getCurrentUser();

    const pullAllMemories = function() {
        database.pullAllMemories($routeParams.itemID)
            .then((data) => {
                $scope.mems = data.data;
                console.log('mems data', data);

            });
    };
    $scope.createMemory = function() {
        database.postFamilyMemory($routeParams.itemID, $scope.newMemory)
            .then((data) => {
                console.log('Created memory data', data);
                $scope.newMemory.id = data;
                database.updateFamilyDataImmediately(data, $scope.newMemory)
                    .then(() => {
                        pullAllMemories();
                    });
            });
        pullAllMemories();
    };
    $scope.deleteMemory = function(item) {
        database.deleteFamMemory(item.id)
            .then(() => {
                pullAllMemories();
            });
    };
    console.log('this is the route param', $routeParams.itemID);
    pullAllMemories();
});