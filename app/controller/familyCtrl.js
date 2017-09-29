"use strict";

app.controller('familyCtrl', function($scope, moment, database, userAuth) {
    $scope.currentUser = userAuth.getCurrentUser();
    $scope.newFamily = {
        families: []
    };
    const updateUserProfile = function() {

        $scope.newFamily.families.push($scope.newFamId);



        database.pullUserInfo($scope.currentUser)
            .then((id) => {
                //console.log('pulled id', id[0].fbID);
                $scope.fbID = id[0].fbID;

                database.updateUserProfile($scope.fbID, $scope.newFamily);
            });
    };

    $scope.title = [];
    $scope.familyName = {
        title: '',
        famId: '',
        userId: '',
        members: []
    };
    $scope.families = [];
    const getFamilyList = function() {
        $scope.families.length = 0;
        database.getFamilies(userAuth.getCurrentUser())
            .then((families) => {
                $scope.families = families;
            });
    };
    $scope.familyName.userId = userAuth.getCurrentUser();
    $scope.createFamily = function() {
        let momentTime = moment().format("X");
        console.log('Brenda family name', $scope.familyName);
        $scope.familyName.members.push(userAuth.getCurrentUser());
        database.familyInfo($scope.familyName)
            .then((familyInfo) => {
                console.log('famiily info', familyInfo);
                $scope.newFamId = familyInfo;
                $scope.familyName.famId = familyInfo;
                database.updateImmediately(familyInfo, $scope.familyName);
                updateUserProfile();
            });
        getFamilyList();
    };
    //This function removes the old Family id, before allowing the user to create another ont
    $scope.removeFamId = function() {
        $scope.newFamId = "";
    };
    $scope.findFamily = function() {
        database.findFamily($scope.familyId)
            .then((data) => {
                $scope.findFamData = data.data;
                $scope.findFamId = data.data.famId;
                $scope.familyName = $scope.findFamData;
                $scope.findUserId = data.data.userId;
                console.log('findfamData', data.data);
                $scope.firebaseId = $scope.familyId;
                console.log('firebaseId', $scope.firebaseId);
            });
    };
    $scope.joinFamily = function() {
        console.log('$scope.familyName.members', $scope.familyName.members);
        $scope.familyName.members.push($scope.findUserId);
        //        database.updateImmediately($scope.firebaseId, $scope.familyName);
        // database.joinFamily($scope.firebaseId, $scope.familyName.members);
        $scope.newFamily.families.push($scope.findFamId);
        database.pullUserInfo($scope.currentUser)
            .then((data) => {
                console.log('Joined family data', data);
                console.log('current user', $scope.currentUser);
                database.joinFamily(data[0].fbID, $scope.newFamily);

            });

    };

    getFamilyList();
});