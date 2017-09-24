define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.app', [
        '$scope',
        '$modal',
        'modules.manage.services.workbenchService',
        'modules.manage.services.messageService',
        function ($scope, $modal, workbenchService, messageService) {
            $scope.workbenchService = workbenchService;

            $scope.messageService = messageService;

            $scope.menuType = 0; // 0菜单，1收藏
        }
    ]);
});