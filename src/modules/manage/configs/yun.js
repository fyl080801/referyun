define('modules.manage.configs.yun', [
    'modules.manage.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$yun', {
                apps: [],
                actived: null
            });
        }
    ]);
});