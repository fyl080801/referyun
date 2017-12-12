define([
    'app/application',
    'ng-table'
], function (application) {
    'use strict';

    application.requires.push('modules.member');

    return angular
        .module('modules.member', [
            'ui.router',
            'ngTable'
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('app.user', {
                        url: '/member/{companyid}',
                        dependencies: ['modules/member/requires'],
                        views: {
                            'header': {
                                templateUrl: 'modules/member/views/header.html'
                            },
                            'content': {
                                templateUrl: 'modules/member/views/user.html'
                            }
                        }
                    });

                $stateProvider
                    .state('app.admin', {
                        url: '/member/{companyid}',
                        dependencies: ['modules/member/requires'],
                        views: {
                            'header': {
                                templateUrl: 'modules/member/views/header.html'
                            },
                            'content': {
                                templateUrl: 'modules/member/views/admin.html'
                            }
                        }
                    });
            }
        ]);
});