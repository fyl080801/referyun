define([
    'modules/localstore/providers'
], function (providers) {
    'use strict';

    providers.provider('modules.localstore.providers.map', [
        function () {
            var me = this;

            this.routes = {};

            this.addRoute = function (def) {
                me.routes[def.method] = me.routes[def.method] ? me.routes[def.method] : [];
                me.routes[def.method].push(def);
            };

            this.$get = function () {
                return {
                    getRoute: function (method, apis) {
                        var methodCol = me.routes[method] ? me.routes[method] : [];
                        var $injector = angular.injector();

                        return null;
                    }
                };
            };
        }
    ]);
});