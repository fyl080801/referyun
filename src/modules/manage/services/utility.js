define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.service('modules.manage.services.utility', [
        function () {
            this.uid = function () {
                return (Date.parse(new Date()) / 1000) + '';
            };
        }
    ]);
});