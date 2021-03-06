define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.formLayout', [
        '$scope',
        '$modal',
        '$yunEnums',
        '$timeout',
        function ($scope, $modal, $yunEnums, $timeout) {
            $scope.preview = function () {
                $modal
                    .open({
                        templateUrl: 'modules/manage/views/formPreview.html',
                        size: 'lg'
                    });
            };

            $scope.formProperty = {
                Columns: 1,
                HiddenValueMode: $yunEnums.HiddenValueModes[0],
                Cached: true
            };

            $('[data-toggle="tooltip"]').tooltip();
        }
    ]);
});