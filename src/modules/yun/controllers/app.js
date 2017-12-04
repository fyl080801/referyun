define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.controller('modules.yun.controllers.app', [
        '$scope',
        '$state',
        '$stateParams',
        '$modal',
        '$yun',
        'modules.yun.services.appService',
        'modules.yun.services.store',
        'modules.yun.services.utility',
        function ($scope, $state, $stateParams, $modal, $yun, appService, store, utility) {
            $scope.apps = [];

            $scope.groups = [];

            $scope.appService = appService;

            $scope.load = function () {
                store.get()
                    .append('app').append($stateParams.appid)
                    .then(function (result) {
                        if (result == null) {
                            $state.go('welcome');
                        } else {
                            $yun.actived = result;
                            store.get()
                                .append('app')
                                .then(function (result) {
                                    $scope.apps = result;
                                });
                        }
                    });
            };

            $scope.loadGroups = function () {
                store.get()
                    .append('app').append($stateParams.appid).append('group')
                    .then(function (result) {
                        utility.toTree(result)
                            .key('Id')
                            .children('Children')
                            .parentKey('ParentId')
                            .onEach(function (idx, item) {
                                item.Level = item.Path.split('/').length - 1;
                            })
                            .then(function (tree) {
                                $scope.groups = tree;
                            });
                    });
            };
        }
    ]);
});