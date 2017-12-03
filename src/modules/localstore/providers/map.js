define([
    'modules/localstore/providers'
], function (providers) {
    'use strict';

    providers.provider('modules.localstore.providers.map', [
        function () {
            var me = this;
            var paramTest = /^\{(.*)\}$/;

            this.routes = {
                get: {},
                post: {},
                put: {},
                patch: {},
                drop: {}
            };

            /**
             * 添加伪路由
             * @param {*} method 方法
             * @param {*} apiDef api定义 /aaa/{id}
             * @param {*} service 所在服务
             * @param {*} funcName 方法名
             */
            this.addRoute = function (method, apiDef, service, funcName) {
                var methodStore = me.routes[method];
                var matched = me.matchRoute(methodStore, apiDef);
                if (matched) {
                    delete methodStore[matched.apiDef];
                }
                methodStore[apiDef] = {
                    name: service,
                    method: funcName
                };
            };

            /**
             * 匹配伪路由
             * @param {*} api 
             */
            this.matchRoute = function (methodStore, api) {
                for (var apiDef in methodStore) {
                    var defPaths = apiDef.split('/');
                    var apiPaths = $.isArray(api) ? api : api.split('/');
                    if ((defPaths.length - 1) !== apiPaths.length) return null;
                    for (var i = 0; i < apiPaths.length; i++) {
                        var apiPathName = apiPaths[i],
                            defPathName = defPaths[i + 1];
                        if (apiPathName != defPathName && !paramTest.test(defPathName)) return null;
                    }
                    return {
                        apiDef: apiDef,
                        apis: defPaths.slice(1),
                        service: methodStore[apiDef]
                    };
                }
                return null;
            };

            this.provider = function () {
                return {
                    getRoute: function (method, apis) {
                        var methodStore = me.routes[method];
                        var matched = me.matchRoute(methodStore, apis);
                        if (matched) {
                            return matched;
                        }
                        return null;
                    }
                };
            };

            this.$get = [this.provider];
        }
    ]);
});