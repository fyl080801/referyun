define('modules.manage.controllers.workbench', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.workbench', [
        '$scope',
        'modules.manage.services.workbenchService',
        function ($scope, workbenchService) {
            $scope.workbenchService = workbenchService;
        }
    ]);
});