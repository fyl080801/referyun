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
            // var me = this;

            // this.HiddenValueModes = [{
            //     key: 'keepValue',
            //     value: '保持原值',
            //     remark: '控件被隐藏时，不改变该字段的原有值'
            // }, {
            //     key: 'nullValue',
            //     value: '空值',
            //     remark: '控件被隐藏时，该字段提交空值'
            // }, {
            //     key: 'reCalculate',
            //     value: '始终重新计算',
            //     remark: '控件的计算、提交逻辑，与没有隐藏时保持一致'
            // }];

            // this.FormLayouts = [{
            //     key: 1,
            //     value: '单列'
            // }, {
            //     key: 2,
            //     value: '双列'
            // }];

            $scope.preview = function () {
                $modal
                    .open({
                        templateUrl: 'views/manage/formPreview.html',
                        size: 'lg'
                    });
            };

            $scope.formProperty = {
                Columns: 1,
                HiddenValueMode: $yunEnums.HiddenValueModes[0],
                Cached: true
            };

            // $timeout(function () {
            //     $scope.formProperty = {
            //         Columns: 1
            //     };
            // });

            $('[data-toggle="tooltip"]').tooltip();
        }
    ]);
});