define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.service('modules.yun.service.store', [
        '$q',
        'modules.yun.services.storeAdapter',
        function ($q, storeAdapter) {

            function deffered(q) {
                var defer = q.defer();
                defer.api = [];
                defer.promise.append = function (key, value) {
                    defer.api.push({
                        key: key,
                        value: value
                    });
                    return defer.promise;
                }
                return defer;
            }

            this.get = function (data) {
                var defer = deffered($q);
                storeAdapter.get(defer);
                return defer.promise;
            };

            this.post = function (data) {
                var defer = deffered($q);
                storeAdapter.post(defer);
                return defer.promise;
            };

            this.put = function (data) {
                var defer = deffered($q);
                storeAdapter.put(defer);
                return defer.promise;
            };

            this.patch = function (data) {
                var defer = deffered($q);
                storeAdapter.patch(defer);
                return defer.promise;
            };

            this.del = function (data) {
                var defer = deffered($q);
                storeAdapter.del(defer);
                return defer.promise;
            };
        }
    ]);
});