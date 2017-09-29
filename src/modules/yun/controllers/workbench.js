define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.controller('modules.yun.controllers.workbench', [
        '$scope',
        '$state',
        '$modal',
        '$yun',
        'app.services.popupService',
        'modules.yun.services.utility',
        'modules.yun.services.appService',
        function ($scope, $state, $modal, $yun, popupService, utility, appService) {
            $scope.appService = appService;

            $scope.addApp = function () {
                $yun.apps.push({
                    appId: utility.uid(),
                    appName: '未命名应用',
                    actived: false,
                    enabled: true,
                    nameEditing: false
                });

                $state.go('app.main', {
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
                            $state.go('app.main', {
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

            $scope.changeAppIcon = function (appinf) {
                $modal
                    .open({
                        templateUrl: 'views/manage/icons.html'
                    }).result
                    .then(function (data) {
                        appinf.icon = data;
                    });
            };
        }
    ]);
});