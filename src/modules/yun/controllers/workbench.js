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

            $scope.editingApp = null;
            $scope.oldApp = null;

            // app
            $scope.addApp = function () {
                store.post()
                    .append('app')
                    .data({
                        AppName: '未命名应用',
                        Enabled: true
                    })
                    .then(function (result) {
                        var addedApp = $.grep($yun.apps, function (item) {
                            return item.Id === result.Id;
                        });
                        if (addedApp.length <= 0) {
                            $yun.apps.push(result);
                        }
                        $state.go('app.main', {
                            appid: result.Id
                        });
                    });
            };

            $scope.dropApp = function (appid) {
                popupService
                    .confirm('是否删除应用？')
                    .ok(function () {
                        store.drop()
                            .append('app').append(appid)
                            .then(function () {
                                if ($yun.actived.Id === appid) {
                                    $yun.actived = null;
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
                                }
                            });
                    });
            };

            $scope.editAppName = function (appinf) {
                $scope.editingApp = appinf;
                $scope.oldApp = $.extend({}, appinf);
            };

            $scope.cancelEditAppName = function () {
                $scope.editingApp.AppName = $scope.oldApp.AppName;
                $scope.editingApp = null;
                $scope.oldApp = null;
            };

            $scope.saveAppName = function (appinf) {
                store.put()
                    .append('app')
                    .data(appinf)
                    .then(function (result) {
                        $scope.editingApp.AppName = result.AppName;
                        $scope.editingApp = null;
                        $scope.oldApp = null;
                    });
            };

            $scope.editAppIcon = function (appinf) {
                $scope.editingApp = appinf;
                $scope.oldApp = $.extend({}, appinf);
                $modal
                    .open({
                        templateUrl: 'modules/yun/views/icons.html',
                        data: $scope.editingApp
                    }).result
                    .then(function (data) {
                        $scope.editingApp.Icon = data;
                        store.put()
                            .append('app')
                            .data(appinf)
                            .then(function (result) {
                                $scope.editingApp = null;
                                $scope.oldApp = null;
                            });
                    }, function () {
                        $scope.editingApp.Icon = $scope.oldApp.Icon;
                        $scope.editingApp = null;
                        $scope.oldApp = null;
                    });
            };
        }
    ]);
});