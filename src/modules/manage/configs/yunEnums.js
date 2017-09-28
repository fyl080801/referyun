define([
    'modules/manage/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$yunEnums', {
                HiddenValueModes: [{
                    key: 'keepValue',
                    value: '保持原值',
                    remark: '控件被隐藏时，不改变该字段的原有值'
                }, {
                    key: 'nullValue',
                    value: '空值',
                    remark: '控件被隐藏时，该字段提交空值'
                }, {
                    key: 'reCalculate',
                    value: '始终重新计算',
                    remark: '控件的计算、提交逻辑，与没有隐藏时保持一致'
                }],
                FormLayouts: [{
                    key: 1,
                    value: '单列'
                }, {
                    key: 2,
                    value: '双列'
                }]
            });
        }
    ]);
});