define('modules.manage.configs.state', [
    'modules.manage.configs'
], function (configs) {
    'use strict';

    configs.run([
        '$rootScope',
        '$yun',
        function ($rootScope, $yun) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (toParams.appid !== undefined && toParams.appid !== null) {
                    $yun.actived = null;
                    $.each($yun.apps, function (idx, item) {
                        if (item.appId + '' === toParams.appid) {
                            item.actived = true;
                            $yun.actived = $yun.apps[idx];
                        } else {
                            item.actived = false;
                        }
                    });
                }
            });
        }
    ]);
});