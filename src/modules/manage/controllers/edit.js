define([
    'modules/manage/module'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.edit', [
        '$scope',
        '$state',
        '$stateParams',
        '$modal',
        '$yun',
        'modules.yun.services.store',
        'modules.yun.services.utility',
        function ($scope, $state, $stateParams, $modal, $yun, store, utility) {

            // function relsoveGroup(yun) {
            //     yun.groups[yun.actived.appId] = yun.groups[yun.actived.appId] ? yun.groups[yun.actived.appId] : [];
            // }

            // function relsoveNewForm(yun) {
            //     relsoveGroup(yun);

            //     yun.actived.forms = yun.actived.forms ? yun.actived.forms : {};

            //     var item = {
            //         uid: utility.uid(),
            //         formName: '新表单'
            //     };

            //     yun.actived.forms[item.uid] = item;

            //     return item;
            // }

            // function relsoveNewFlow(yun) {
            //     relsoveGroup(yun);
            // }

            // $scope.addForm = function () {
            //     $modal
            //         .open({
            //             templateUrl: 'views/manage/newForm.html'
            //         }).result
            //         .then(function (data) {
            //             var item = relsoveNewForm($yun);

            //             if (data === 'create') {
            //                 $yun.groups[$stateParams.appid].push({
            //                     groupName: item.formName,
            //                     isLeaf: true,
            //                     itemType: 'form',
            //                     itemId: item.uid,
            //                     icon: 'fa fa-sticky-note',
            //                 });
            //             } else {

            //             }

            //             $state.go('app.editform.layout', {
            //                 appid: $stateParams.appid,
            //                 formid: item.uid
            //             });
            //         });
            // };

            // $scope.addFlow = function () {
            //     $modal
            //         .open({
            //             templateUrl: 'views/manage/newForm.html'
            //         }).result
            //         .then(function (data) {
            //             if (data === 'create') {
            //                 // $yun.groups[$stateParams.appid].push({
            //                 //     groupName: '新页面',
            //                 //     isLeaf: true,
            //                 //     itemType: 'flow',
            //                 //     itemDefine: {},
            //                 //     icon: 'fa fa-sitemap',
            //                 // });
            //             } else {

            //             }
            //         });
            // };

            // $scope.addReport = function () {

            // };

            function toTree(data) {
                data.forEach(function (item) {
                    item.Level = item.Path.split('/').length - 1;
                    delete item.Children;
                });

                var map = {};
                data.forEach(function (item) {
                    map[item.Id] = item;
                });

                var val = [];
                data.forEach(function (item) {
                    var parent = map[item.ParentId];
                    if (parent) {
                        (parent.Children || (parent.Children = [])).push(item);
                    } else {
                        val.push(item);
                    }
                });

                return val;
            }

            $scope.currentGroup = null;
            $scope.groups = [];
            $scope.groupSorting = false;
            $scope.saveGroupSorting = function () {
                $scope.groupSorting = false;
            };
            $scope.loadGroups = function () {
                store.get()
                    .append('app').append($stateParams.appid).append('group')
                    .then(function (result) {
                        $scope.groups = toTree(result);
                    });
            };
            $scope.selectGroup = function (item) {
                if ($scope.currentGroup && $scope.currentGroup.Id === item.Id) {
                    $scope.currentGroup = null;
                } else {
                    $scope.currentGroup = item;
                }
            };
            $scope.addGroup = function (item) {
                $modal
                    .open({
                        templateUrl: 'views/manage/groupForm.html',
                        size: 'sm',
                        data: {
                            AppId: $stateParams.appid,
                            IsLeaf: false,
                            ParentId: item ? item.Id : null,
                            Path: item ? item.Path : null
                        }
                    }).result
                    .then(function (data) {
                        store.post()
                            .append('group')
                            .data(data)
                            .then(function (result) {
                                $scope.loadGroups();
                            });
                    });
            };
            $scope.editGroup = function (item) {
                $modal
                    .open({
                        templateUrl: 'views/manage/groupForm.html',
                        size: 'sm',
                        data: item
                    }).result
                    .then(function (data) {
                        // store.put()
                        //     .append('group')
                        //     .data(data)
                        //     .then(function (result) {
                        //         $scope.loadGroups();
                        //     });
                    });
            };
        }
    ]);
});