define('modules.manage.controllers.app', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.app', [
        '$scope',
        '$modal',
        'modules.manage.services.workbenchService',
        function ($scope, $modal, workbenchService) {
            $scope.workbenchService = workbenchService;

            $scope.menuType = 0; // 0菜单，1收藏
        }
    ]);
});