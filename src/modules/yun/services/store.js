define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.service('modules.yun.services.store', [
        '$q',
        'modules.yun.configs.storeAdapter',
        function ($q, storeAdapter) {

            function deffered(q) {
                var defer = q.defer();
                defer.apis = [];
                defer.queries = [];
                defer.promise.append = function (path) {
                    defer.apis.push(path);
                    return defer.promise;
                };
                defer.promise.query = function (k, v) {
                    defer.queries.push({
                        key: k,
                        value: v
                    });
                    return defer.promise;
                };
                return defer;
            }

            this.get = function () {
                var defer = deffered($q);
                storeAdapter.get(defer);
                return defer.promise;
            };

            this.post = function (data) {
                var defer = deffered($q);
                storeAdapter.post(defer, data);
                return defer.promise;
            };

            this.put = function (data) {
                var defer = deffered($q);
                storeAdapter.put(defer, data);
                return defer.promise;
            };

            this.patch = function (data) {
                var defer = deffered($q);
                storeAdapter.patch(defer, data);
                return defer.promise;
            };

            this.del = function () {
                var defer = deffered($q);
                storeAdapter.del(defer);
                return defer.promise;
            };
        }
    ]);
});