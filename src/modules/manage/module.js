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
                                templateUrl: 'modules/manage/views/editHeader.html'
                            },
                            'content': {
                                templateUrl: 'modules/manage/views/editContent.html'
                            }
                        }
                    });

                $stateProvider
                    .state('app.editform', {
                        url: '/editform/{formid}',
                        dependencies: ['modules/manage/requires'],
                        views: {
                            'header': {
                                templateUrl: 'modules/manage/views/formHeader.html'
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
                        templateUrl: 'modules/manage/views/formLayout.html'
                    });

                $stateProvider
                    .state('app.editform.data', {
                        url: '/edit',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'modules/manage/views/formData.html'
                    });

                $stateProvider
                    .state('app.editform.setting', {
                        url: '/edit',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'modules/manage/views/formSetting.html'
                    });

                $stateProvider
                    .state('settings', {
                        url: '/settings/{appid}',
                        dependencies: ['modules/manage/requires'],
                        templateUrl: 'modules/manage/views/settings.html'
                    });
            }
        ]);
});