define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.edit', [
        '$scope',
        '$modal',
        function ($scope, $modal) {
            $scope.groupSorting = false;

            $scope.saveGroupSorting = function () {
                $scope.groupSorting = false;
            };

            $scope.addGroup = function () {
                $modal
                    .open({
                        templateUrl: 'views/manage/groupForm.html',
                        size: 'sm'
                    }).result
                    .then(function (data) {

                    });
            };

            $scope.addForm = function () {
                $modal
                    .open({
                        templateUrl: 'views/manage/newForm.html'
                    }).result
                    .then(function (data) {

                    });
            };

            $scope.addReport = function () {

            };
        }
    ]);
});