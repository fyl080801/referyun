define('modules.manage.controllers.editHeader', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.editHeader', [
        '$scope',
        function ($scope) {
            $scope.titleEditing = false;

            $scope.changeTitle = function () {
                $scope.titleEditing = false;
            };
        }
    ]);
});