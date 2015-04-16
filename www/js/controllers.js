angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
})

.controller('DrawCtrl', function ($scope, $ionicModal) {
  $scope.color = "#000";

    // Create the Color Picker modal
    $ionicModal.fromTemplateUrl('templates/colorpicker.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    
    // Close modal
    $scope.closeColorPicker = function() {
      $scope.modal.hide();
    };
    
    // Submit
    $scope.submitColorPicker = function() {

      $scope.modal.hide();
    };
    
    // Color Picker modal
    $scope.colorPicker = function () {
      $scope.modal.show();
      $('#picker').colpick({
        submit: false,
        color: "000000",
        flat:true,
        layout: "rgbhex",
        onChange:function(hsb,hex,rgb,el,bySetColor) {
          $(".modal .center").css('background-color','#'+hex);
          console.log(rgb);
          $scope.color = '#'+hex;
        }
      });
    };
    
    $scope.clearDraw = function(){
        $("td").css({backgroundColor: "#000"});
    };
    
    isMouseDown = false;
    $('td').mousedown(function() {
      isMouseDown = true;
      $(this).css({backgroundColor: $scope.color});
    }).mouseup(function() {
      isMouseDown = false;
    });
    
    $('td').hover(function() {
      if(isMouseDown)
        $(this).css({backgroundColor: $scope.color});
    });
    
    $("td").on("touchmove", function (event){
      var coords = event.originalEvent.touches[0];
      if($(document.elementFromPoint(coords.clientX, coords.clientY)).is("td")){
        $(document.elementFromPoint(coords.clientX, coords.clientY)).css({backgroundColor:$scope.color});
      }
    });
  }).controller('TicTacCtrl', function ($scope) {
    $scope.config={size:10,
     nowPlayer:1,
     color:['green','blue'],
     turns:0,
     board:[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
   };


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
$scope.paintBorder=function(idColor){

  for(var i=0;i<=$scope.config.size-1;i++){
    $scope.board[0][i].color=$scope.config.color[idColor];;//first line
    $scope.board[i][0].color=$scope.config.color[idColor];;//first collumn
    $scope.board[i][$scope.config.size-1].color=$scope.config.color[idColor];;//last collumn
    $scope.board[$scope.config.size-1][i].color=$scope.config.color[idColor];;//last line
  }
}

for(var i=1;i<=$scope.config.size-2;i++){
     $scope.board[i][3].color='red';//fitst collumn
       $scope.board[i][6].color='red';//last collumn

         $scope.board[3][i].color='red';//fitst collumn
       $scope.board[6][i].color='red';//last collumn
     }

     $scope.clickCell=function(id){      
      var valid=true;

      if (id==11 || id==12 || id==21 || id==22){
        if ($scope.config.board[0][0]==-1){
          $scope.board[1][1].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[1][2].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[2][1].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[2][2].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[0][0]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==14 || id==15 || id==24 || id==25){
        if ($scope.config.board[0][1]==-1){
          $scope.board[1][4].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[1][5].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[2][4].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[2][5].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[0][1]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==17 || id==18 || id==27 || id==28){
        if ($scope.config.board[0][2]==-1){
          $scope.board[1][7].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[1][8].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[2][7].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[2][8].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[0][2]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==41 || id==42 || id==51 || id==52){
        if ($scope.config.board[1][0]==-1){
          $scope.board[4][1].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[4][2].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[5][1].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[5][2].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[1][0]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==44 || id==45 || id==54 || id==55){
        if ($scope.config.board[1][1]==-1){
          $scope.board[4][4].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[4][5].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[5][4].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[5][5].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[1][1]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==47 || id==48 || id==57 || id==58){
        if ($scope.config.board[1][2]==-1){
          $scope.board[4][7].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[4][8].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[5][7].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[5][8].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[1][2]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==71 || id==72 || id==81 || id==82){
        if ($scope.config.board[2][0]==-1){
          $scope.board[7][1].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[7][2].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[8][1].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[8][2].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[2][0]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==74 || id==75 || id==84 || id==85){
        if ($scope.config.board[2][1]==-1){
          $scope.board[7][4].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[7][5].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[8][4].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[8][5].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[2][1]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      } else if (id==77 || id==78 || id==87 || id==88){
        if ($scope.config.board[2][2]==-1){
          $scope.board[7][7].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[7][8].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[8][7].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.board[8][8].color=$scope.config.color[$scope.config.nowPlayer];
          $scope.config.board[2][2]=$scope.config.nowPlayer;
        }else{
          valid=false;
        }
      }else{
        valid=false;
      }

      if (valid){
        $scope.config.turns++;

        if ($scope.config.nowPlayer){
          $scope.config.nowPlayer=0;
        }else{
          $scope.config.nowPlayer=1;
        }

        if ($scope.config.turns==9){ $scope.paintBorder( $scope.config.nowPlayer);}
      }

    }

  });
