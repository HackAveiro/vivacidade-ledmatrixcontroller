angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
}).controller('DrawCtrl', function ($scope, $ionicModal) {
    $scope.color = "#FFF";

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

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // Submit
    $scope.submitColorPicker = function() {
        $scope.modal.hide();
    };

    // Color Picker modal
    $scope.colorPicker = function () {
        $scope.modal.show();
        $('#picker').colpick({
            submit: false,
            color: "FFFFFF",
            flat:true,
            layout: "rgbhex",
            onChange:function(hsb,hex,rgb,el,bySetColor) {
                $(".modal .center").css('background-color','#'+hex);
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
}).controller('TicTacCtrl', function ($scope, $interval, $timeout) {

    $scope.initTicTac = function(){
        console.log("init");
        $scope.config={
            size:10,
            nowPlayer:1,
            color:['green','blue'],
            turns:0,
            board:[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
            winner: -1,
            wins: [7, 56, 448, 73, 146, 292, 273, 84] //http://jsfiddle.net/rtoal/5wKfF/
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

        for(var i=1;i<=$scope.config.size-2;i++){
            $scope.board[i][3].color='red';//fitst collumn
            $scope.board[i][6].color='red';//last collumn
            $scope.board[3][i].color='red';//fitst collumn
            $scope.board[6][i].color='red';//last collumn
        }
    }

    $scope.initTicTac();

    $scope.paintBorder=function(color){
        for(var i=0;i<=$scope.config.size-1;i++){
            $scope.board[0][i].color=color;//first line
            $scope.board[i][0].color=color;//first collumn
            $scope.board[i][$scope.config.size-1].color=color;//last collumn
            $scope.board[$scope.config.size-1][i].color=color;//last line
        }
    }

    $scope.clickCell=function(id){
        if($scope.config.winner != -1){
            return true; //stops if there is a winner
        }
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

            $scope.config.nowPlayer = +!$scope.config.nowPlayer;

            var common = 0;
            var player1sum = 0, player0sum = 0;
            for (var i = 0; i < $scope.config.board.length; i++) {
                for (var j = 0; j < $scope.config.board.length; j++) {

                    if($scope.config.board[i][j] == 1) {
                        player1sum += Math.pow(2, common);
                    }

                    if($scope.config.board[i][j] == 0) {
                        player0sum += Math.pow(2, common);
                    }

                    common++;
                }
            }

            for (var i = 0; i < $scope.config.wins.length; i++) {
                if (($scope.config.wins[i] & player0sum) === $scope.config.wins[i] || ($scope.config.wins[i] & player1sum) === $scope.config.wins[i]) {
                    $scope.config.winner = +!$scope.config.nowPlayer;
                    $scope.paintBorder($scope.config.color[$scope.config.winner]);
                    $interval(function(){
                        $timeout(function () {
                            $scope.paintBorder($scope.config.color[$scope.config.winner]);
                        }, 500);
                        $scope.paintBorder("black");
                    }, 1000);
                    $timeout(function(){
                        $scope.initTicTac();
                    }, 4000);
                }
            }

            if ($scope.config.winner == -1 && $scope.config.turns==9){
                $scope.initTicTac();
            }
        }

    }

}).controller('TetrisCtrl', function ($scope) {
    /*
    * Tetris with jQuery - 2006/06/25
    *   see: http://en.wikipedia.org/wiki/Category:Tetris
    *        http://en.wikipedia.org/wiki/Tetris_Worlds
    *   be careful: http://en.wikipedia.org/wiki/Tetris_effect
    * Copyright (c) 2006 Franck Marcia
    * Licensed under the MIT License:
    *   http://www.opensource.org/licenses/mit-license.php
    */

    var tetris = {

        // Shape colors
        colors: ['#eaeaea','#ff6600','#eec900','#0000ff',
        '#cc00ff','#00ff00','#66ccff','#ff0000'],

        // Starting line for each shape
        startAt: [0, -1, -1, -1, 0, -1, -1, 0],

        // Points per number of lines
        points: [0, 40, 100, 300, 1200],

        // Combination of each shape
        shapes: [
            // none
            [],
            // I
            [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
            [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
            // T
            [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
            [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
            [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
            [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
            // L
            [[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
            [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
            [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
            [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
            // J
            [[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
            [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
            [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
            [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
            // Z
            [[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
            [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
            // S
            [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
            [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]],
            // O
            [[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]],

            // Pre-load elements of the grid
            init: function() {
                var i, j, k;
                tetris.cells = [];
                for (i = 0; i < 10; ++i) {
                    tetris.cells[i] = [];
                    for (j = 0; j < 10; ++j) {
                        k = String.fromCharCode(i + 97);
                        tetris.cells[i][j] = $(['#', k, j+1].join(''));
                    }
                }
                tetris.bound = $.browser == 'msie' ? '#tetris' : window;
            },

            // Initialize to start the game
            start: function() {
                // Stats
                tetris.level = 0;
                tetris.lines = 0;
                tetris.score = 0;
                // Array which contains data of the grid
                tetris.grid = [
                    [1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1]];
                    $('#grid td').css('backgroundColor', tetris.colors[0]);
                    $('#start').unbind("click").val('pause').click(tetris.pause);
                    $('#stop').attr('disabled', false);
                    $(tetris.bound).keydown(tetris.key);
                    tetris.next = tetris.newShape();
                    tetris.shift();
                    tetris.duration = 600;
                    tetris.refresh();
                    tetris.timer = window.setInterval(tetris.moveDown, tetris.duration);
                },

                // Define the action to be fired depending on key entry
                key: function(e) {
                    switch(e.charCode || e.keyCode) {
                        case 65: case 97: case 37: tetris.moveLeft(); break; // A, a, LEFT (ARROW KEY)
                        case 68: case 100: case 39: tetris.moveRight(); break; // D, d, RIGHT (ARROW KEY)
                        case 83: case 115: case 40: tetris.moveDown(); break; // S, s, DOWN (ARROW KEY)
                        case 87: case 119: case 38: tetris.rotate(); break; // W, w, UP (ARROW KEY)
                    }
                },

                // Generate an random shape
                newShape: function() {
                    var r = 1 + Math.random() * 7;
                    return parseInt(r > 7 ? 7 : r, 10);
                },

                // Define then draw the next shape
                setNext: function() {
                    var i, j, s, c, d, n = tetris.colors[0];
                    tetris.next = tetris.newShape();
                    s = tetris.shapes[tetris.next][0];
                    c = tetris.colors[tetris.next];
                    for (i = 0; i < 4; ++i) {
                        for (j = 0; j < 4; ++j) {
                            d = s[i][j] ? c : n;
                            $(['#x', j, i].join('')).css('backgroundColor', d);
                        }
                    }
                },

                // The next shape becomes the current one; reset coordinates
                shift: function() {
                    tetris.cur = tetris.next;
                    tetris.x = tetris.x0 = 4;
                    tetris.y = tetris.startAt[tetris.cur];
                    tetris.y0 = tetris.y - 2;
                    tetris.r = tetris.r0 = 0;
                    tetris.curShape = tetris.shapes[tetris.cur];
                    if (tetris.canGo(0, tetris.x, tetris.y)) {
                        tetris.setNext();
                        return true;
                    }
                    return false;
                },

                // Pause the game
                pause: function() {
                    $(tetris.bound).unkeypress(tetris.key);
                    window.clearInterval(tetris.timer);
                    tetris.timer = null;
                    $('#start').unclick(tetris.pause).val('resume').click(tetris.resume);
                },

                // Resume the game
                resume: function() {
                    $(tetris.bound).keydown(tetris.key);
                    tetris.timer = window.setInterval(tetris.moveDown, tetris.duration);
                    $('#start').unclick(tetris.resume).val('pause').click(tetris.pause);
                },

                // Stop the game
                gameOver: function() {
                    var i, j;
                    // Manage buttons
                    if (tetris.timer) {
                        //$(tetris.bound).unkeypress(tetris.key);
                        window.clearInterval(tetris.timer);
                        tetris.timer = null;
                        //$('#start').unbind(tetris.pause).val('start').click(tetris.start);
                    } else {
                        //$("#start").unbind(tetris.resume).val('start').click(tetris.start);
                    }
                    $('#stop').attr('disabled', true);
                    // Draw everything in white
                    for (i = 0; i < 10; ++i) {
                        for (j = 1; j < 11; ++j) {
                            if (tetris.grid[i][j]) {
                                tetris.cells[i][j].css('backgroundColor', '#cccccc');
                            }
                        }
                    }
                    console.log("33333");
                    tetris.draw(tetris.r0, tetris.x0, tetris.y0, '#cccccc');
                },

                // Check overlays
                canGo: function(r, x, y) {
                    var i, j;
                    for (i = 0; i < 4; ++i) {
                        for (j = 0; j < 4; ++j) {
                            if (tetris.curShape[r][j][i] && tetris.grid[y + j] &&
                                tetris.grid[y + j][x + i]) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    },

                    // Move the current shape to the left
                    moveLeft: function() {
                        if (tetris.canGo(tetris.r, tetris.x - 1, tetris.y)) {
                            --tetris.x;
                            tetris.refresh();
                        }
                    },

                    // Move the current shape to the right
                    moveRight: function() {
                        if (tetris.canGo(tetris.r, tetris.x + 1, tetris.y)) {
                            ++tetris.x;
                            tetris.refresh();
                        }
                    },

                    // Rotate the current shape
                    rotate: function() {
                        var r = tetris.r == tetris.curShape.length - 1 ? 0 : tetris.r + 1;
                        if (tetris.canGo(r, tetris.x, tetris.y)) {
                            tetris.r0 = tetris.r;
                            tetris.r = r;
                            tetris.refresh();
                        }
                    },

                    // Move down the current shape
                    moveDown: function() {
                        if (tetris.canGo(tetris.r, tetris.x, tetris.y + 1)) {
                            ++tetris.y;
                            tetris.refresh();
                        } else {
                            tetris.touchDown();
                        }
                    },

                    // The current shape touches down
                    touchDown: function() {
                        var i, j, k, r, f;
                        // mark the grid
                        for (i = 0; i < 4; ++i) {
                            for (j = 0; j < 4; ++j) {
                                if (tetris.curShape[tetris.r][j][i] &&
                                    tetris.grid[tetris.y + j]) {
                                        tetris.grid[tetris.y + j][tetris.x + i] = tetris.cur;
                                    }
                                }
                            }
                            // search complete lines
                            f = 0;
                            for (i = 9, k = 9; i > -1 && f < 4; --i, --k) {
                                if (tetris.grid[i].join('').indexOf('0') == -1) {
                                    // Complete lines become white
                                    for (j = 1; j < 11; ++j) {
                                        tetris.cells[k][j].css('backgroundColor', '#cccccc');
                                    }
                                    ++f;
                                    for (j = i; j > 0; --j) {
                                        tetris.grid[j] = tetris.grid[j - 1].concat();
                                    }
                                    ++i;
                                }
                            }
                            // animate
                            if (f) {
                                window.clearInterval(tetris.timer);
                                tetris.timer = window.setTimeout(function(){tetris.after(f);}, 100);
                            }
                            // try to continue
                            if (tetris.shift()) {
                                tetris.refresh();
                            } else {
                                tetris.gameOver();
                            }
                        },

                        // Finish the touchdown process
                        after: function(f) {
                            var i, j, l = (tetris.level < 20 ? tetris.level : 20) * 25;
                            // stats
                            tetris.lines += f;
                            if (tetris.lines % 10 === 0) {
                                tetris.level = tetris.lines / 10;
                            }
                            window.clearTimeout(tetris.timer);
                            tetris.timer = window.setInterval(tetris.moveDown, tetris.duration - l);
                            tetris.score += (tetris.level + 1) * tetris.points[f];
                            // redraw the grid
                            for (i = 0; i < 10; ++i) {
                                for (j = 1; j < 11; ++j) {
                                    tetris.cells[i][j].css('backgroundColor',
                                    tetris.colors[tetris.grid[i][j]]);
                                }
                            }
                            tetris.refresh();
                        },

                        // Draw the current shape
                        draw: function(r, x, y, c) {
                            console.log("----------------------");
                            console.log(r);
                            console.log(x);
                            console.log(y);
                            console.log(c);
                            var i, j;
                            for (i = 0; i < 4; ++i) {
                                for (j = 0; j < 4; ++j) {
                                    if (tetris.curShape[r][j][i]) {
                                        console.log(i);
                                        console.log(j);
                                        console.log("##" + (y + j));
                                        tetris.cells[y + j][x + i].css({'background': c});
                                    }
                                }
                            }
                        },

                        // Refresh the grid
                        refresh: function() {
                            // remove from the old position
                            tetris.draw(tetris.r0, tetris.x0, tetris.y0, tetris.colors[0]);
                            // draw to the next one
                            tetris.draw(tetris.r, tetris.x, tetris.y, tetris.colors[tetris.cur]);
                            // change stats
                            $('#level').html(tetris.level + 1);
                            $('#lines').html(tetris.lines);
                            $('#score').html(tetris.score);
                            // reset coordinates
                            tetris.x0 = tetris.x;
                            tetris.y0 = tetris.y;
                            tetris.r0 = tetris.r;
                        }

                    };

                    // Everything starts here
                    tetris.init();


                    //$('#grid table, #next table').css('backgroundColor', tetris.colors[0]);
                    $('#start').click(tetris.start);
                    $('#stop').click(tetris.gameOver);


                    //$(window).load(function() {});


                });
