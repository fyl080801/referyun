define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.service('modules.yun.services.appService', [
        function () {
            this.toggleMessage = function () {
                $('body').toggleClass('yun-message-show');
                return false;
            };

            this.toggleWorkbench = function () {
                $('body').toggleClass('yun-workbench-show');
                return false;
            };
        }
    ]);
});