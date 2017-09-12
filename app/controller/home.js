"use strict";

app.controller('home', function($scope, moment, database) {
    //This is just the empty array and object to hold the family's name and id
    $scope.items = [];
    $scope.familyName = {
        title: '',
        famId: ''
    };



    /*This block of code will do three things.
    1) when the button is clicked, it will generate a new family id based on a randomly generated number
    plus the current timestamp

    2) when the button is clicked, it will take the value of the user input of their family's last name
    and add it to a variable

    3) when clicked, it will take the value of the family's last name , and the value of the unique family id and
    place them into the empty object and array.
    */
    $scope.createFamily = function() {
        //This is generating the family id
        let momentTime = moment().format("X");
        $scope.newFamId = Math.floor(Math.random() * 9999999) + momentTime;
        //This is takeing the value of the user's input for their family's last name

        console.log(' $scope.familyName', $scope.familyName);

        //This is adding the unique family id to the empty array
        $scope.familyName.famId = $scope.newFamId;

        database.familyInfo($scope.familyName);
    };




    //This function removes the old Family id, before allowing the user to create another ont
    $scope.removeFamId = function() {
        $scope.newFamId = "";
    };



    // $scope.add = function(item) {
    //     $scope.items.push(item);
    //     $scope.newItem = { title: '' }; // set newItem to a new object to lose the reference
    //     console.log('items array inside', $scope.items);
    // };
    // console.log('items array outside', $scope.items);

});