define('modules.manage.module', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.manage');

    return angular
        .module('modules.manage', [
            'ui.router'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/app/');

                $stateProvider
                    .state('app', {
                        url: '/app/{appid}',
                        dependencies: ['modules.manage.requires'],
                        templateUrl: 'components/manage/app.html'
                    });

                $stateProvider
                    .state('app.edit', {
                        url: '/edit',
                        dependencies: ['modules.manage.requires'],
                        views: {
                            'header': {
                                templateUrl: 'components/manage/editHeader.html'
                            },
                            'content': {
                                templateUrl: 'components/manage/edit.html'
                            }
                        }
                    });

                $stateProvider
                    .state('settings', {
                        url: '/settings/{appid}',
                        dependencies: ['modules.manage.requires'],
                        templateUrl: 'components/manage/settings.html'
                    });
            }
        ]);
});