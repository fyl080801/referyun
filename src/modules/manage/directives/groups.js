define([
    'modules/manage/module',
    'metisMenu'
], function (module) {
    'use strict';

    module.directive('groups', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {
                $scope.$on('ngRepeated', function () {
                    $('.metismenu').metisMenu();
                });
            };

            return {
                scope: {
                    groups: '=',
                    mode: '@mode'
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                template: '<ul class="metismenu nav"><li group-item="group" ng-repeat="group in groups" ng-repeated></li></ul>'
            };
        }
    ]);
});