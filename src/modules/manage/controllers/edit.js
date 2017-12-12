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
        'app.services.popupService',
        'modules.yun.services.store',
        'modules.yun.services.utility',
        function ($scope, $state, $stateParams, $modal, $yun, popupService, store, utility) {

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
                        utility.toTree(result)
                            .key('Id')
                            .children('Children')
                            .parentKey('ParentId')
                            .onEach(function (idx, item) {
                                item.Level = item.Path.split('/').length - 1;
                            })
                            .then(function (tree) {
                                $scope.groups = tree;
                            });
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
                        templateUrl: 'modules/manage/views/groupForm.html',
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
                        templateUrl: 'modules/manage/views/groupForm.html',
                        size: 'sm',
                        data: $.extend({}, item)
                    }).result
                    .then(function (data) {
                        store.put()
                            .append('group')
                            .data(data)
                            .then(function (result) {
                                $scope.loadGroups();
                            });
                    });
            };
            $scope.deleteGroup = function (item) {
                popupService
                    .confirm('是否删除？')
                    .ok(function () {
                        store.drop()
                            .append('group').append(item.Id)
                            .then(function () {
                                $scope.loadGroups();
                            });
                    });
            };

            // 添加表单
            $scope.addForm = function () {
                $modal
                    .open({
                        templateUrl: 'modules/manage/views/newForm.html'
                    }).result
                    .then(function (data) {
                        $state.go('app.editform.layout', {
                            appid: $stateParams.appid,
                            formid: ''
                        });
                    });
            };
        }
    ]);
});