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
                        url: '/user/{companyid}',
                        dependencies: ['modules/member/requires'],
                        views: {
                            'header': {
                                templateUrl: 'views/member/header.html'
                            },
                            'content': {
                                templateUrl: 'views/member/user.html'
                            }
                        }
                    });

                $stateProvider
                    .state('app.admin', {
                        url: '/admin/{companyid}',
                        dependencies: ['modules/member/requires'],
                        views: {
                            'header': {
                                templateUrl: 'views/member/header.html'
                            },
                            'content': {
                                templateUrl: 'views/member/admin.html'
                            }
                        }
                    });
            }
        ]);
});