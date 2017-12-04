define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.directive('treeNav', [
        function () {
            function controller($scope) {
                $scope.childrenField = $scope.childrenField ? $scope.childrenField : 'children';
                $scope.leafField = $scope.leafField ? $scope.leafField : 'isLeaf';
                $scope.levelField = $scope.levelField ? $scope.levelField : 'level';

                $scope.itemExpended = function (item, $event) {
                    item.$$isExpend = !item.$$isExpend;
                    //$event.stopPropagation();
                };

                $scope.getItemIcon = function (item) {
                    var isLeaf = $scope.isLeaf(item);

                    if (isLeaf) {
                        return item.icon ? item.icon : 'fa fa-file-o';
                    }

                    return item.$$isExpend ? 'fa fa-folder-open' : 'fa fa-folder';
                };

                $scope.initStyle = function (item) {
                    var deepLevel = item[$scope.levelField] * 20;
                    item.objStyle = {
                        'margin-left': deepLevel > 0 ? deepLevel + 'px' : '0'
                    };
                };

                $scope.getChildrenField = function () {
                    return $scope.childrenField;
                };

                $scope.isLeaf = function (item) {
                    return item[$scope.leafField]; //|| (!item[$scope.childrenField] || !item.children.length || item.children.length <= 0);
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
                replace: true,
                template: '<ul class="nav nav-pills nav-stacked"><li ng-repeat="item in treeData" class="clearfix" ng-class="{\'active\':activeItem&&activeItem[valueField]===item[valueField]}" ng-include="\'modules/yun/templates/navItem.html\'"></li></ul>',
                scope: {
                    treeData: '=',
                    textField: '@',
                    valueField: '@',
                    childrenField: '@',
                    mode: '@',
                    leafField: '@',
                    levelField: '@',
                    activeItem: '=',
                    itemClicked: '&',
                    removeClicked: '&',
                    editClicked: '&',
                    addClicked: '&',
                    itemTemplateUrl: '@'
                },
                controller: ['$scope', controller]
            };
        }
    ]);
});