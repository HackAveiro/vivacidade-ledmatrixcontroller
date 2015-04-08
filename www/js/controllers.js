angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
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
}).controller('TicTacCtrl', function ($scope) {

        responsiveGrid();

});
