define([
    'modules/yun/configs'
], function (configs) {
    'use strict';

    configs.run([
        '$rootScope',
        '$state',
        '$yun',
        function ($rootScope, $state, $yun) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toParams.appid !== undefined && toParams.appid !== null) {
                    if ($yun.apps.length <= 0) { // 不包含任何app跳转欢迎页
                        event.preventDefault();
                        $state.go('welcome');
                    } else { // 是否包含app, 不包含跳转到第一个
                        var appExisted = false;
                        $.each($yun.apps, function (idx, item) {
                            if (item.appId + '' === toParams.appid) {
                                appExisted = true;
                                return false;
                            }
                        });
                        if (!appExisted) {
                            toParams.appid = $yun.apps[0].appId;
                        }
                    }
                }
            });

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