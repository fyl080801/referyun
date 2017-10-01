define([
    'modules/yun/configs'
], function (configs) {
    'use strict';

    configs.provider('modules.yun.configs.storeAdapter', [
        function () {
            this.$get = [function () {
                return {
                    get: function (apiDefer) {
                        throw '未实现该方法';
                    },
                    post: function (apiDefer, data) {
                        throw '未实现该方法';
                    },
                    put: function (apiDefer, data) {
                        throw '未实现该方法';
                    },
                    patch: function (apiDefer, data) {
                        throw '未实现该方法';
                    },
                    del: function (apiDefer) {
                        throw '未实现该方法';
                    }
                };
            }];
        }
    ]);
});