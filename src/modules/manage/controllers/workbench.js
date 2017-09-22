define('modules.manage.controllers.workbench', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.workbench', [
        '$scope',
        '$state',
        '$yun',
        'app.services.popupService',
        'modules.manage.services.workbenchService',
        function ($scope, $state, $yun, popupService, workbenchService) {
            $scope.workbenchService = workbenchService;

            $scope.addApp = function () {
                $yun.apps.push({
                    appId: (Date.parse(new Date()) / 1000) + '',
                    appName: '未命名应用',
                    actived: false,
                    nameEditing: false
                });

                $state.go('app', {
                    appid: $yun.apps[$yun.apps.length - 1].appId
                });
            };

            $scope.dropApp = function (appid) {
                popupService
                    .confirm('是否删除应用？')
                    .ok(function () {
                        $yun.actived = null;
                        $.each($yun.apps, function (idx, item) {
                            if (item.appId + '' === appid) {
                                $yun.apps.splice(idx, 1);
                                return false;
                            }
                        });
                        if ($yun.apps[0]) {
                            $state.go('app', {
                                appid: $yun.apps[0].appId
                            });
                        } else {
                            // 没有app时需跳转到创建界面
                        }
                    });
            };

            $scope.changeAppName = function (appinf) {
                appinf.nameEditing = false;
            };
        }
    ]);
});