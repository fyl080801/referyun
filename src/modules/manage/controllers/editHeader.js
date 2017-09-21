define('modules.manage.controllers.editHeader', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.editHeader', [
        '$scope',
        'modules.manage.services.workbenchService',
        function ($scope, workbenchService) {
            $scope.titleEditing = false;

            $scope.workbenchService = workbenchService;

            $scope.changeTitle = function () {
                $scope.titleEditing = false;
            };
        }
    ]);
});