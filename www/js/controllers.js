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
$scope.config={size:10};


  $scope.board= new Array($scope.config.size-1);
  for (var i = 0; i <= $scope.config.size-1; i++) {
     $scope.board[i] = new Array($scope.config.size);
  }

//$scope.board=[$scope.config.size-1][$scope.config.size-1];
for(var l=0;l<=$scope.config.size-1;l++){
    for(var c=0;c<=$scope.config.size-1;c++){
  $scope.board[l][c]={color:'black'};
    }
}

/*
for(var i=0;i<=$scope.config.size-1;i++){
    $scope.board[0][i].color='red';//first line
    $scope.board[i][0].color='red';//first collumn
    $scope.board[i][$scope.config.size-1].color='red';//last collumn
    $scope.board[$scope.config.size-1][i].color='red';//last line
}*/

for(var i=1;i<=$scope.config.size-2;i++){
     $scope.board[i][3].color='red';//fitst collumn
       $scope.board[i][6].color='red';//last collumn

         $scope.board[3][i].color='red';//fitst collumn
       $scope.board[6][i].color='red';//last collumn
}

$scope.clickCell=function(id){
    console.log(id);

if (id==11 || id==12 || id==21 || id==22){
      $scope.board[1][1].color='blue';
      $scope.board[1][2].color='blue';
      $scope.board[2][1].color='blue';
      $scope.board[2][2].color='blue';
}

if (id==14 || id==15 || id==24 || id==25){
      $scope.board[1][4].color='blue';
      $scope.board[1][5].color='blue';
      $scope.board[2][4].color='blue';
      $scope.board[2][5].color='blue';
}

if (id==17 || id==18 || id==27 || id==28){
      $scope.board[1][7].color='blue';
      $scope.board[1][8].color='blue';
      $scope.board[2][7].color='blue';
      $scope.board[2][8].color='blue';
}

//----------------------------------------------------------------
//----------------------------------------------------------------
if (id==41 || id==42 || id==51 || id==52){
      $scope.board[4][1].color='blue';
      $scope.board[4][2].color='blue';
      $scope.board[5][1].color='blue';
      $scope.board[5][2].color='blue';
}

if (id==44 || id==45 || id==54 || id==55){
      $scope.board[4][4].color='blue';
      $scope.board[4][5].color='blue';
      $scope.board[5][4].color='blue';
      $scope.board[5][5].color='blue';
}

if (id==47 || id==48 || id==57 || id==58){
      $scope.board[4][7].color='blue';
      $scope.board[4][8].color='blue';
      $scope.board[5][7].color='blue';
      $scope.board[5][8].color='blue';
}
//----------------------------------------------------------------
//----------------------------------------------------------------
if (id==71 || id==72 || id==81 || id==82){
      $scope.board[7][1].color='blue';
      $scope.board[7][2].color='blue';
      $scope.board[8][1].color='blue';
      $scope.board[8][2].color='blue';
}

if (id==74 || id==75 || id==84 || id==85){
      $scope.board[7][4].color='blue';
      $scope.board[7][5].color='blue';
      $scope.board[8][4].color='blue';
      $scope.board[8][5].color='blue';
}

if (id==77 || id==78 || id==87 || id==88){
      $scope.board[7][7].color='blue';
      $scope.board[7][8].color='blue';
      $scope.board[8][7].color='blue';
      $scope.board[8][8].color='blue';
}

}

console.log($scope.board);

});
