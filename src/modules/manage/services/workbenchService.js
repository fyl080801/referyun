define('modules.manage.services.workbenchService', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.service('modules.manage.services.workbenchService', [
        function () {
            this.toggle = function () {
                $('body').toggleClass('yun-app');
                return false;
            };
        }
    ]);
});