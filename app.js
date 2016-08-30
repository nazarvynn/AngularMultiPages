
angular.module('myapp', [
    'ui.router'
  ])
  .controller('Page1Controller', ['$scope', function($scope) {
    $scope.title = 'Page 1';
  }])


  .controller('Page2Controller', ['$scope', '$state', function($scope, $state) {
    $scope.title = 'Page 2';
    $scope.page2TabList = [{id: 1}, {id: 2}, {id: 3}];
    //$scope.activeTabId = 2; // will be resolved at 'root.page2' state
  }])

  .controller('Page2TabController', ['$scope', '$state', function($scope, $state) {
    $scope.tabId = $state.params.tabId;
    $state.go('root.page2.tab.subroute', $state.params);
  }])
  
  
  .controller('RedirectorController', ['$scope', '$state', 
    function($scope, $state) {
      $state.go('root.page2.tab', { tabId: $scope.activeTabId });
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      
      .state('root', {
        url: '',
        views: {
          '@': {
            templateUrl: './tpl.layout.html',
            controller: function($state) {
              $state.go('root.page1');
            }
          },
          'header@root': {
            templateUrl: './tpl.header.html'
          },
          'footer@root': {
            templateUrl: './tpl.footer.html'
          }
        }
      })
      
      .state('root.page1', {
        url: '/page1',
        views: {
          'content@root': {
            templateUrl: './tpl.page1.html',
            controller: 'Page1Controller'
          }
        }
      })
      
      .state('root.page2', {
        url: '/page2',
        views: {
          'content@root': {
            templateUrl: './tpl.page2.html',
            controller: 'Page2Controller'
          },
          '@root.page2': {
            template: '<div></div>',
            controller: 'RedirectorController'
          }
        }
      })
      
      .state('root.page2.tab', {
        url: '/:tabId',
        templateUrl: 'tpl.page2.tab.html',
        controller: 'Page2TabController'
      })

      .state('root.page2.tab.subroute', {
        //url: '',
        templateUrl: 'tpl.page2.tab.subroute.html'
      })
      
      ;
      
    $urlRouterProvider.otherwise('/page2');

  });