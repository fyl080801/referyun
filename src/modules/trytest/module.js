define([
    'app/application',
    'schema-form-bootstrap'
], function (application) {
    'use strict';

    application.requires.push('modules.trytest');

    return angular
        .module('modules.trytest', [
            'ui.bootstrap',
            'ui.router',
            'schemaForm'
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
            }
        ]);
});