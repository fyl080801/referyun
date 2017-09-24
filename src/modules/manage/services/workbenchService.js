define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.service('modules.manage.services.workbenchService', [
        function () {
            this.toggle = function () {
                $('body').toggleClass('yun-workbench-show');
                return false;
            };
        }
    ]);
});