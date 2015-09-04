localStorage['serviceURL'] = "http://localhost:8008/ratasasserver/";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

	// Tab de login
	.state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'SignInCtrl'
   	
    })

  // Tab principal, debe ser abstracta, porque contiene las demas tabs
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'PopupCtrl'
  })

  // Los tabs que van dentro del tab principal

	.state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeTabCtrl'
      }
    }
  })
  
  .state('tab.region', {
    url: '/region',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-region.html',
        controller: 'CargarRegiones'
      }
    }
  })
  
  .state('tab.entidadesf', {
    url: '/entidadesf',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-entidadesf.html',
        controller: 'CargarEntidades'
      }
    }
  })
  
  .state('tab.dentidad', {
    url: '/dentidad',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-dentidad.html',
        controller: 'CargarDEntidad'
      }
    }
  })
  
    .state('tab.tasaspa', {
    url: '/tasaspa',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-tasaspa.html',
        controller: 'CargarTasasPA'
      }
    }
  })

   .state('tab.evotasaspa', {
    url: '/evotasaspa',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-evotasaspa.html',
        controller: 'LGraphCtrl'
      }
    }
  })

 .state('tab.simulacion', {
    url: '/simulacion',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-simulacion.html',
        controller: 'DashCtrl'
      }
    }
  })
  
   .state('tab.gsimulacion', {
    url: '/gsimulacion',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-gsimulacion.html',
        controller: 'BGraphCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
