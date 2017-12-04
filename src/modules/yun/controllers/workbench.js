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
        'modules.yun.services.appService',
        'modules.yun.services.store',
        function ($scope, $state, $modal, $yun, popupService, appService, store) {
            $scope.appService = appService;

            // app
            $scope.addApp = function () {
                store.post()
                    .append('app')
                    .data({
                        AppName: '未命名应用',
                        Enabled: true,
                        nameEditing: false
                    })
                    .then(function (result) {
                        $state.go('app.main', {
                            appid: result.Id
                        });
                    });
            };

            $scope.dropApp = function (appid) {
                popupService
                    .confirm('是否删除应用？')
                    .ok(function () {
                        $yun.actived = null;
                        store.drop()
                            .append('app').append(appid)
                            .then(function () {
                                store.get()
                                    .append('app').append('')
                                    .then(function (result) {
                                        if (result) {
                                            $state.go('app.main', {
                                                appid: result.Id
                                            });
                                        } else {
                                            $state.go('welcome');
                                        }
                                    });
                            });
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