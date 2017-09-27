define([
    'app/application',
    'modules/manage/configs/yun',
    'modules/manage/configs/yunEnums',
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
                    .state('app.main', {
                        url: '/main',
                        dependencies: ['modules/manage/requires'],
                        views: {
                            'header': {
                                templateUrl: 'views/manage/appHeader.html'
                            },
                            'content': {
                                templateUrl: 'views/manage/appContent.html'
                            }
                        }
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
                                templateUrl: 'views/manage/editContent.html'
                            }
                        }
                    });

                $stateProvider
                    .state('app.editform', {
                        url: '/editform/{formid}',
                        dependencies: ['modules/manage/requires'],
                        views: {
                            'header': {
                                templateUrl: 'views/manage/formHeader.html'
                            },
                            'content': {
                                template: '<div class="yun-content-full" ui-view></div>'
                            }
                        }
                    });

                $stateProvider
                    .state('app.editform.layout', {
                        url: '/layout',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/formLayout.html'
                    });

                $stateProvider
                    .state('app.editform.data', {
                        url: '/layout',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/formData.html'
                    });

                $stateProvider
                    .state('app.editform.setting', {
                        url: '/layout',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/formSetting.html'
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