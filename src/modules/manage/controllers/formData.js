define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.formData', [
        '$scope',
        function ($scope) {
            $scope.testCount = 0;
        }
    ]);
});