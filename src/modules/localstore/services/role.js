define([
    'modules/localstore/services'
], function (services) {
    'use strict';

    services.service('modules.localstore.services.role', [
        '$dataStore',
        function ($dataStore) {
            this.list = function () {

            };
        }
    ]);
});