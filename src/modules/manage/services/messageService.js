define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.service('modules.manage.services.messageService', [
        function () {
            this.toggle = function () {
                $('body').toggleClass('yun-message-show');
                return false;
            };
        }
    ]);
});