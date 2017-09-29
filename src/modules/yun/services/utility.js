define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.service('modules.yun.services.utility', [
        function () {
            this.uid = function () {
                return (Date.parse(new Date()) / 1000) + '';
            };
        }
    ]);
});