define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.editHeader', [
        '$scope',
        'modules.yun.services.appService',
        function ($scope, appService) {
            $scope.titleEditing = false;

            $scope.appService = appService;

            $scope.changeTitle = function () {
                $scope.titleEditing = false;
            };
        }
    ]);
});