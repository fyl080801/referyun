define('modules.manage.controllers.edit', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.edit', [
        '$scope',
        '$modal',
        function ($scope, $modal) {
            $scope.addGroup = function () {
                $modal
                    .open({
                        templateUrl: 'components/manage/groupForm.html',
                        size: 'sm'
                    }).result
                    .then(function (data) {

                    });
            };

            $scope.addForm = function () {
                $modal
                    .open({
                        templateUrl: 'components/manage/newForm.html'
                    }).result
                    .then(function (data) {

                    });
            };

            $scope.addReport = function () {

            };
        }
    ]);
});