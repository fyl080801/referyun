define([
    'modules/member/module'
], function (module) {
    'use strict';

    module.controller('modules.member.controllers.org', [
        '$scope',
        'NgTableParams',
        function ($scope, NgTableParams) {
            $scope.tableParams = new NgTableParams();

            $scope.list = [];
        }
    ]);
});