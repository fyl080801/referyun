define([
    'modules/trytest/module'
], function (module) {
    'use strict';

    module.controller('modules/trytest/components/webimtest', [
        '$scope',
        'modules/trytest/factories/messageHub',
        function ($scope, messageHub) {
            $scope.records = [];
            $scope.messageHub = messageHub;

            messageHub.setReceive(function (msg) {
                $scope.records.push(msg);
            });

        }
    ]);
});