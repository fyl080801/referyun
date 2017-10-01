define([
    'modules/localstore/providers'
], function (providers) {
    'use strict';

    providers.provider('modules.localstore.providers.app', [
        '$dataStore',
        function ($dataStore) {
            this.map = {
                '': 'addApp'
            };

            this.addApp = function () {

            };

            this.$get = function () {
                return {

                };
            };
        }
    ]);
});