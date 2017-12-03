define([
    'modules/localstore/factories'
], function (factories) {
    'use strict';

    factories.factory('modules.localstore.factories.utility', [
        function () {

            function uid() {
                return (Date.parse(new Date()) / 1000) + '';
            }

            return {
                uid: uid
            };
        }
    ]);
});