define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('modules.yun.configs.storeAdapter', [
                '$delegate',
                '$timeout',
                'modules.localstore.providers.map',
                function ($delegate, $timeout, map) {
                    var paramExpr = /\w+(?=[{}]?)/;

                    $delegate.get = function (apiDefer) {
                        $timeout(function () {
                            var route = map.getRoute('get', apiDefer.apis);

                            apiDefer.resolve(null);
                        });
                        return apiDefer.promise;
                    };

                    $delegate.post = function (apiDefer, data) {
                        $timeout(function () {
                            var route = map.getRoute('post', apiDefer.apis);

                            apiDefer.resolve(null);
                        });
                        return apiDefer.promise;
                    };

                    $delegate.put = function (apiDefer, data) {
                        $timeout(function () {
                            var route = map.getRoute('put', apiDefer.apis);

                            apiDefer.resolve(null);
                        });
                        return apiDefer.promise;
                    };

                    $delegate.patch = function (apiDefer, data) {
                        $timeout(function () {
                            var route = map.getRoute('patch', apiDefer.apis);

                            apiDefer.resolve(null);
                        });
                        return apiDefer.promise;
                    };

                    $delegate.drop = function (apiDefer) {
                        $timeout(function () {
                            var route = map.getRoute('drop', apiDefer.apis);

                            apiDefer.resolve(null);
                        });
                        return apiDefer.promise;
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
});