define([
    'modules/trytest/module'
], function (module) {
    'use strict';

    module.controller('modules/trytest/components/formtest', [
        '$scope',
        '$modal',
        '$timeout',
        'app.services.popupService',
        'modules/trytest/services/formService',
        function ($scope, $modal, $timeout, popupService, formService) {
            $scope.formService = formService;

            $scope.columns = [{
                key: 'Name',
                title: '名称',
                'type': 'string'
            }, {
                key: 'Remark',
                title: '备注',
                'type': 'string'
            }];

            $scope.schema = {
                'type': 'object',
                properties: {}
            };

            $scope.fields = [];

            $scope.options = {
                validationMessage: formService.validationMessage
            };

            $scope.fakedata = {};

            $scope.addField = function (col) {
                if ($scope.schema.properties[col.key]) return;
                $scope.schema.properties[col.key] = {
                    title: col.title,
                    'type': col['type']
                };

                $scope.fields.push({
                    key: col.key,
                    'type': 'text'
                });
                $timeout(function () {
                    $scope.$broadcast('schemaFormRedraw');
                });
            };

            $scope.dropField = function (field) {
                popupService
                    .confirm('是否删除字段？')
                    .ok(function () {
                        $.each($scope.fields, function (idx, item) {
                            if (item.key === field.key) {
                                $scope.fields.splice(idx, 1);
                                delete $scope.schema.properties[field.key];
                                return false;
                            }
                        });
                        $timeout(function () {
                            $scope.$broadcast('schemaFormRedraw');
                        });
                    });
            };

            $scope.setRequired = function (field) {
                field.required = field.required ? false : true;
                $timeout(function () {
                    $scope.$broadcast('schemaFormRedraw');
                });
            };

            $scope.setReadonly = function (field) {
                field.readonly = field.readonly ? false : true;
                $timeout(function () {
                    $scope.$broadcast('schemaFormRedraw');
                });
            }

            $scope.setFieldType = function (field, ft) {
                field.type = ft;
                $timeout(function () {
                    $scope.$broadcast('schemaFormRedraw');
                });
            };
        }
    ]);
});