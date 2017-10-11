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
        function ($scope, $state, $stateParams, $modal, $yun, appService, store) {
            $scope.appService = appService;

            // app/{id}
            store.get()
                .append('app').append($stateParams.appid)
                .then(function (result) {
                    if (result == null) {
                        $state.go('welcome');
                    } else {
                        $yun.actived = result;
                    }
                });
        }
    ]);
});