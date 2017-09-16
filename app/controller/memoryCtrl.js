"use strict";

app.controller('memoryCtrl', function($scope, database, userAuth) {

    $scope.memoryContent = {
        image: '',
        message: '',
        userId: ''
    };
    //getting the user id
    $scope.userId = userAuth.getCurrentUser();
    console.log('memory userid', $scope.userId);
    $scope.memoryContent.userId = $scope.userId;
    let userId = $scope.memoryContent.userId;

    $scope.createMemory = function() {
        database.createMemory($scope.memoryContent);
        database.getData($scope.userId);
        $scope.pulledArray.push($scope.memoryContent);
        console.log('$scope.memoryContent', $scope.memoryContent);

    };

    const showAllTasks = function() {
        $scope.pulledArray = [];
        database.getData()
            .then((items) => {
                console.log("showAllTasks from promise", items);
                $scope.pulledArray = items;
                console.log('pulledArray', $scope.pulledArray);

            });
    };
    database.getData($scope.userId);
    showAllTasks();
});