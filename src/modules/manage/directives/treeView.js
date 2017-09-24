define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.directive('treeView', [
        function () {
            function controller($scope) {
                $scope.itemExpended = function (item, $event) {
                    item.$$isExpend = !item.$$isExpend;
                    $event.stopPropagation();
                };

                $scope.getItemIcon = function (item) {
                    var isLeaf = $scope.isLeaf(item);

                    if (isLeaf) {
                        return item.icon ? item.icon : 'fa fa-file-o';
                    }

                    return item.$$isExpend ? 'fa fa-folder-open' : 'fa fa-folder';
                };

                $scope.isLeaf = function (item) {
                    return item.isLeaf; //!item.children || !item.children.length;
                };

                $scope.warpCallback = function (callback, item, $event) {
                    ($scope[callback] || angular.noop)({
                        $item: item,
                        $event: $event
                    });
                };
            }

            return {
                restrict: 'AE',
                templateUrl: 'templates/treeView.html',
                scope: {
                    treeData: '=',
                    canChecked: '=',
                    textField: '@',
                    itemClicked: '&',
                    itemCheckedChanged: '&',
                    itemTemplateUrl: '@'
                },
                controller: ['$scope', controller]
            };
        }
    ]);
});