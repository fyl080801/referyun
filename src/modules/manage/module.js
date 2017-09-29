define([
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('modules.manage');

    return angular
        .module('modules.manage', [
            'ui.router'
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
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
                        url: '/edit',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/formLayout.html'
                    });

                $stateProvider
                    .state('app.editform.data', {
                        url: '/edit',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'views/manage/formData.html'
                    });

                $stateProvider
                    .state('app.editform.setting', {
                        url: '/edit',
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