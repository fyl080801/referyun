define([
    'modules/manage/module',
    'metisMenu'
], function (module) {
    'use strict';

    module.controller('modules.manage.controllers.edit', [
        '$scope',
        '$state',
        '$stateParams',
        '$modal',
        '$yun',
        'modules.manage.services.utility',
        function ($scope, $state, $stateParams, $modal, $yun, utility) {
            function relsoveGroup(yun) {
                yun.groups[yun.actived.appId] = yun.groups[yun.actived.appId] ? yun.groups[yun.actived.appId] : [];
            }

            function relsoveNewForm(yun) {
                relsoveGroup(yun);

                yun.actived.forms = yun.actived.forms ? yun.actived.forms : {};

                var item = {
                    uid: utility.uid(),
                    formName: '新表单'
                };

                yun.actived.forms[item.uid] = item;

                return item;
            }

            function relsoveNewFlow(yun) {
                relsoveGroup(yun);
            }

            $scope.groupSorting = false;

            $scope.saveGroupSorting = function () {
                $scope.groupSorting = false;
            };

            $scope.addGroup = function () {
                $modal
                    .open({
                        templateUrl: 'views/manage/groupForm.html',
                        size: 'sm'
                    }).result
                    .then(function (data) {
                        relsoveGroup($yun);

                        $yun.groups[$yun.actived.appId].push({
                            groupName: data.GroupName,
                            isLeaf: false,
                            icon: null,
                            children: []
                        });
                    });
            };

            $scope.addForm = function () {
                $modal
                    .open({
                        templateUrl: 'views/manage/newForm.html'
                    }).result
                    .then(function (data) {
                        var item = relsoveNewForm($yun);

                        if (data === 'create') {
                            $yun.groups[$stateParams.appid].push({
                                groupName: item.formName,
                                isLeaf: true,
                                itemType: 'form',
                                itemId: item.uid,
                                icon: 'fa fa-sticky-note',
                            });
                        } else {

                        }

                        $state.go('app.editform.layout', {
                            appid: $stateParams.appid,
                            formid: item.uid
                        });
                    });
            };

            $scope.addFlow = function () {
                $modal
                    .open({
                        templateUrl: 'views/manage/newForm.html'
                    }).result
                    .then(function (data) {
                        if (data === 'create') {
                            // $yun.groups[$stateParams.appid].push({
                            //     groupName: '新页面',
                            //     isLeaf: true,
                            //     itemType: 'flow',
                            //     itemDefine: {},
                            //     icon: 'fa fa-sitemap',
                            // });
                        } else {

                        }
                    });
            };

            $scope.addReport = function () {

            };
        }
    ]);
});