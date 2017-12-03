define([
    'modules/localstore/services'
], function (services) {
    'use strict';

    services.service('modules.localstore.services.app', [
        '$dataStore',
        'modules.localstore.services.role',
        function ($dataStore, role) {
            this.list = function () {

            };

            this.getApp = function (appid) {

                return {};
            };
        }
    ]);
});