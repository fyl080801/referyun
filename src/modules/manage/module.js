define([
    'app/application',
    'modules/manage/configs/yun',
    'modules/manage/configs/rootScope',
    'modules/manage/configs/state'
], function (application) {
    'use strict';

    application.requires.push('modules.manage');

    return angular
        .module('modules.manage', [
            'ui.bootstrap',
            'ui.router',
            'modules.manage.configs'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/app/');

                $stateProvider
                    .state('welcome', {
                        url: '/welcome',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/welcome.html'
                    });

                $stateProvider
                    .state('app', {
                        url: '/app/{appid}',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/app.html'
                    });

                $stateProvider
                    .state('app.edit', {
                        url: '/edit',
                        dependencies: ['modules/manage/requires'],
                        views: {
                            'header': {
                                templateUrl: 'views/manage/editHeader.html'
                            },
                            'content': {
                                templateUrl: 'views/manage/edit.html'
                            }
                        }
                    });

                $stateProvider
                    .state('settings', {
                        url: '/settings/{appid}',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/settings.html'
                    });
            }
        ]);
});