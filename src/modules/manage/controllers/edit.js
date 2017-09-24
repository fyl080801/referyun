define([
    'modules/manage/module',
    'metisMenu'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.edit', [
        '$scope',
        '$stateParams',
        '$modal',
        '$yun',
        function ($scope, $stateParams, $modal, $yun) {
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
                        $yun.groups[$yun.actived.appId] = $yun.groups[$yun.actived.appId] ? $yun.groups[$yun.actived.appId] : [];
                        $yun.groups[$yun.actived.appId].push({
                            groupName: data.GroupName,
                            isLeaf: false,
                            icon: '',
                            children: []
                        });
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