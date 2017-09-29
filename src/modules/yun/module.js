define([
    'app/application',
    'modules/yun/configs/yun',
    'modules/yun/configs/yunEnums',
    'modules/yun/configs/rootScope',
    'modules/yun/configs/state'
], function (application) {
    'use strict';

    application.requires.push('modules.yun');

    return angular
        .module('modules.yun', [
            'ui.bootstrap',
            'ui.router',
            'modules.yun.configs'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/app/');

                $stateProvider
                    .state('welcome', {
                        url: '/welcome',
                        dependencies: ['modules/yun/requires'],
                        templateUrl: 'views/yun/welcome.html'
                    });

                $stateProvider
                    .state('app', {
                        url: '/app/{appid}',
                        dependencies: ['modules/yun/requires'],
                        templateUrl: 'views/yun/app.html'
                    });

                $stateProvider
                    .state('app.main', {
                        url: '/main',
                        dependencies: ['modules/yun/requires'],
                        views: {
                            'header': {
                                templateUrl: 'views/yun/appHeader.html'
                            },
                            'content': {
                                templateUrl: 'views/yun/appContent.html'
                            }
                        }
                    });
            }
        ]);
});