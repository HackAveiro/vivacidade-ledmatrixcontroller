// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        //client.connect(options);
        responsiveGrid();
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0); // This way views are not cached, and that solves the responsiveness problem...

    $stateProvider
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    }).state('app.draw', {
        url: "/draw",
        views: {
            'menuContent': {
                templateUrl: "templates/draw.html",
                controller: 'DrawCtrl'
            }
        }
    }).state('app.tictac', {
        url: "/tictac",
        views: {
            'menuContent': {
                templateUrl: "templates/tictac.html",
                controller: 'TicTacCtrl'
            }
        }
    }).state('app.tetris', {
        url: "/tetris",
        views: {
            'menuContent': {
                templateUrl: "templates/tetris.html",
                controller: 'TetrisCtrl'
            }
        }
    }).state('app.about', {
        url: "/about",
        views: {
            'menuContent': {
                templateUrl: "templates/about.html"
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/draw');
});
