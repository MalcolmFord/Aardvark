"use strict";

app.controller('famEdit', function($scope, $routeParams, database) {

    const pullSingleFamilyMemory = function() {
        database.pullSingleFamilyMemory($routeParams.itemId)
            .then((data) => {
                console.log('pullSingleFamilyMemory', data);
                $scope.update = data.data;

            });
    };
    $scope.submitMemory = function() {
        let newMemory = {
            'text': $scope.update.text
        };
        console.log('something', $scope.update.text);

        database.updateFamilyMemory($routeParams.itemId, newMemory);
    };
    pullSingleFamilyMemory();
});