define([
    'modules/manage/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$yun', {
                apps: [], // 应用
                actived: null, // 当前活动
                groups: {}, // 分组
                defaultApp: null,
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