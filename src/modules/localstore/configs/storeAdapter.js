define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    /**
     * 
     * @param {*}  modules.yun.configs.storeAdapter
     * @param {*}  
     */
    function decorator($delegate, $timeout) {
        $delegate.get = function (apiDefer) {
            $timeout(function () {
                apiDefer.resolve(null);
            });
            return apiDefer.promise;
        };

        $delegate.post = function (apiDefer, data) {
            $timeout(function () {
                apiDefer.resolve(null);
            });
            return apiDefer.promise;
        };

        $delegate.put = function (apiDefer, data) {
            $timeout(function () {
                apiDefer.resolve(null);
            });
            return apiDefer.promise;
        };

        $delegate.patch = function (apiDefer, data) {
            $timeout(function () {
                apiDefer.resolve(null);
            });
            return apiDefer.promise;
        };

        $delegate.del = function (apiDefer) {
            $timeout(function () {
                apiDefer.resolve(null);
            });
            return apiDefer.promise;
        };

        return $delegate;
    }

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('modules.yun.configs.storeAdapter', [
                '$delegate',
                '$timeout',
                decorator
            ]);
        }
    ]);
});