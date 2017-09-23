define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.directive('groupItem', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {

                // $scope.openLink = function (link) {
                //     if ($tabStore[link.id] !== undefined) {
                //         $tabStore[link.id].active();
                //     } else {
                //         $tabStore[link.id] = $tab.open(link);
                //         $tabStore[link.id].result
                //             .then(function () {
                //                 delete $tabStore[link.id];
                //             });
                //     }
                // };
            };

            return {
                scope: {
                    groupItem: '=',
                    mode: '=mode'
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/groupItem.html'
            };
        }
    ]);
});