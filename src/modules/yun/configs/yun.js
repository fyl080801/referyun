define([
    'modules/yun/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$yun', {
                // companyId: '1',
                // apps: [], // 应用
                actived: null // 当前活动
                // groups: {}, // 分组
                // defaultApp: null,
                // messages: []
                //
                // customTypes: {
                //     'form': {
                //         icon: '',
                //         text: '',
                //         remark: '',
                //         style: ''
                //     },
                //     'flow': {

                //     },
                //     'report': {}
                // }
            });
        }
    ]);
});