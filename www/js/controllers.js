angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('DrawCtrl', function ($scope) {
    isMouseDown = false;
    $('td').mousedown(function() {
        isMouseDown = true;
        $(this).css({backgroundColor:'red'});
    }).mouseup(function() {
        isMouseDown = false;
    });

    $('td').hover(function() {
        if(isMouseDown)
            $(this).css({backgroundColor:'orange'});
    });
    
    $("td").on("touchmove", function (event){
        var coords = event.originalEvent.touches[0];
        if($(document.elementFromPoint(coords.clientX, coords.clientY)).is("td")){
            $(document.elementFromPoint(coords.clientX, coords.clientY)).css({backgroundColor:'green'});
        }
    });
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
