define([
    'app/application',
    'modules/yun/configs/yun',
    'modules/yun/configs/yunEnums',
    'modules/yun/configs/rootScope',
    'modules/yun/configs/state',
    'modules/yun/configs/storeAdapter',
    'schema-form-bootstrap'
], function (application) {
    'use strict';

    application.requires.push('modules.yun');

    return angular
        .module('modules.yun', [
            'ui.bootstrap',
            'ui.router',
            'schemaForm',
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
                        templateUrl: 'modules/yun/views/welcome.html'
                    });

                $stateProvider
                    .state('app', {
                        url: '/app/{appid}',
                        dependencies: ['modules/yun/requires'],
                        templateUrl: 'modules/yun/views/app.html'
                    });

                $stateProvider
                    .state('app.main', {
                        url: '/main',
                        dependencies: ['modules/yun/requires'],
                        views: {
                            'header': {
                                templateUrl: 'modules/yun/views/appHeader.html'
                            },
                            'content': {
                                templateUrl: 'modules/yun/views/appContent.html'
                            }
                        }
                    });

                $stateProvider
                    .state('formtest', {
                        url: '/formtest',
                        dependencies: ['modules/yun/requires'],
                        templateUrl: 'modules/yun/views/formtest.html'
                    });
            }
        ]);
});