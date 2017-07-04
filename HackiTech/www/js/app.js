
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider)
{
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl'
    })
    .state('main.contentByCategory', {
      url: '/contentByCategory/:catId',
      templateUrl: 'templates/contentByCategory.html',
      controller: 'CatCtrl'
    })
    .state('main.contentRecent', {
      url: '/contentRecent',
      templateUrl: 'templates/menuContent.html',
      controller: 'MainCtrl'
    })
    .state('main.postDetail', {
      url: '/postDetail/:postId',
      templateUrl: '/templates/postDetail.html',
      controller: 'PostCtrl'
    })

    $urlRouterProvider.otherwise('/main/contentRecent');

})
