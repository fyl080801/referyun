define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.controller('modules.yun.controllers.app', [
        '$scope',
        '$modal',
        'modules.yun.services.appService',
        function ($scope, $modal, appService) {
            $scope.appService = appService;

            //$scope.menuType = 0; // 0菜单，1收藏
        }
    ]);
});