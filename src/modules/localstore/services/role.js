define([
    'modules/localstore/services'
], function (services) {
    'use strict';

    services
        .config([
            'modules.localstore.providers.mapProvider',
            function (mapProvider) {

            }
        ])
        .service('modules.localstore.services.role', [
            '$dataStore',
            function ($dataStore) {
                this.list = function () {

                };
            }
        ]);
});