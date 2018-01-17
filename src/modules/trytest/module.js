define([
    'app/application',
    'schema-form-bootstrap',
    'angular-signalr-hub'
], function (application) {
    'use strict';

    application.requires.push('modules.trytest');

    return angular
        .module('modules.trytest', [
            'ui.bootstrap',
            'ui.router',
            'schemaForm',
            'SignalR'
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('formtest', {
                        url: '/formtest',
                        dependencies: ['modules/trytest/requires'],
                        templateUrl: 'modules/trytest/components/formtest.html'
                    });

                $stateProvider
                    .state('webimtest', {
                        url: '/webimtest',
                        dependencies: ['modules/trytest/requires'],
                        templateUrl: 'modules/trytest/components/webimtest.html'
                    });
            }
        ]);
});