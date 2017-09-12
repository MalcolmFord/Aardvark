"use strict";

app.controller('landingPage', function($scope, database) {
    let items = [];
    let showAll = function() {
        console.log('$scope.pulledData', $scope.pulledData);

        database.getData()
            .then((pulledData) => {
                console.log('showing all items', pulledData);
                $scope.pulledData = pulledData;

            });

    };
    showAll();
});