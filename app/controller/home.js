"use strict";

app.controller('home', function($scope, moment, database, userAuth) {
    $scope.title = [];
    //This is just the empty array and object to hold the family's name and id
    $scope.familyName = {
        title: '',
        famId: '',
        userId: ''
    };

    $scope.families = [];
    const getFamilyList = function() {

        $scope.families.length = 0;

        database.getFamId(userAuth.getCurrentUser())
            .then(families => {
                $scope.families = families;

            });
    };



    //The line below is pulling the user's id from the userAuth.js page, and sending it to the empty object
    $scope.familyName.userId = userAuth.getCurrentUser();
    /*This block of code will do three things.
    1) when the button is clicked, it will generate a new family id based on a randomly generated number
    plus the current timestamp
    2) when the button is clicked, it will take the value of the user input of their family's last name
    and add it to a variable
    3) when clicked, it will take the value of the family's last name , and the value of the unique family id and
    place them into the empty object and array.*/
    $scope.createFamily = function() {
        //This is generating the family id
        let momentTime = moment().format("X");
        $scope.newFamId = Math.floor(Math.random() * 9999999) + momentTime;
        //This is takeing the value of the user's input for their family's last name
        //This is adding the unique family id to the empty array
        $scope.familyName.famId = $scope.newFamId;
        database.familyInfo($scope.familyName)
            .then((familyInfo) => {

                getFamilyList();
            });

    };
    //This function removes the old Family id, before allowing the user to create another ont
    $scope.removeFamId = function() {
        $scope.newFamId = "";
    };

    /*The goal of this block of code is to pull down to family id's that the user created,
    take the title of those and display them as a list item in the drop down menu.*/

    getFamilyList();

    $scope.showFamId = function(event) {

    };









});