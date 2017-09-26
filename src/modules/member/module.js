define([
    'app/application'
], function (application) {
    'use strict';

    application.requires.push('modules.member');

    return angular
        .module('modules.member', [
            'ui.router'
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('app.user', {
                        url: '/user',
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
                        url: '/admin',
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

                $stateProvider
                    .state('app.user.org', {
                        url: '/org',
                        dependencies: ['modules/member/requires'],
                        views: {
                            'memberTree': {
                                templateUrl: 'views/member/orgTree.html'
                            },
                            'memberContent': {
                                templateUrl: 'views/member/orgContent.html'
                            }
                        }
                    });

                $stateProvider
                    .state('app.user.role', {
                        url: '/role',
                        dependencies: ['modules/member/requires'],
                        views: {
                            'memberTree': {
                                templateUrl: 'views/member/roleList.html'
                            },
                            'memberContent': {
                                templateUrl: 'views/member/roleContent.html'
                            }
                        }
                    });
            }
        ]);
});