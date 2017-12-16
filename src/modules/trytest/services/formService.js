define([
    'modules/trytest/module'
], function (module) {
    'use strict';

    module.service('modules/trytest/services/formService', [
        function () {
            var me = this;

            this.validationMessage = {
                0: '错误的类型: {{schema.type}} (应为 {{form.type}})',
                302: '{{title}} 不可为空',
                200: '字符串太短 (当前 {{viewValue.length}} 个字), 最小 {{schema.minLength}}'
            };

            this.fieldTypes = [{
                'type': 'text',
                name: '文本框',
                editors: ['placeholder']
            }, {
                'type': 'textarea',
                name: '文本域',
                editors: ['placeholder']
            }, {
                'type': 'number',
                name: '数字输入',
                editors: ['placeholder']
            }, {
                'type': 'checkbox',
                name: '勾选框'
            }, {
                'type': 'select',
                name: '下拉列表'
            }];

            this.editors = {
                placeholder: {
                    key: 'placeholder',
                    title: '水印',
                    'type': 'string'
                }
            };

            this.getFieldEditors = function (field) {
                var fieldDefine = $.grep(me.fieldTypes, function (item) {
                    return field.type === item.type;
                })[0];
                var editors = [];
                if (fieldDefine) {
                    $.each(fieldDefine.editors, function (idx, item) {
                        editors.push(me.editors[item]);
                    });
                }
                return editors;
            };

            this.getFieldType = function (ft) {
                return $.grep(me.fieldTypes, function (item) {
                    return ft === item['type'];
                })[0];
            }
        }
    ]);
});