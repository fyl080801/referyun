define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    var paramPatten = new RegExp('\{(.|)+?\}', 'igm');
    var paramTest = /^\{(.*)\}$/;

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('modules.yun.configs.storeAdapter', [
                '$delegate',
                '$timeout',
                'modules.localstore.providers.map',
                function ($delegate, $timeout, map) {

                    function invoke(apiDefer, matched) {
                        var queries = apiDefer.queries;
                        var apis = apiDefer.apis;
                        var data = apiDefer.data;
                        var params = {};

                        for (var i = 0; i < apis.length; i++) {
                            var currentName = matched.apis[i];
                            if (paramTest.test(currentName)) {
                                params[currentName.replace('{', '').replace('}', '')] = apis[i];
                            }
                        }

                        var matchedArgs = matched.func.toString().split(')')[0].split('(')[1].split(',');
                        var funcArgs = [];
                        if (data) {
                            funcArgs.push(data);
                        }
                        for (var j = 0; j < matchedArgs.length; j++) {
                            var paramValue = undefined;
                            if (params[matchedArgs[j]] !== undefined) {
                                paramValue = params[matchedArgs[j]];
                            }
                            if (queries[matchedArgs[j]] !== undefined) {
                                paramValue = queries[matchedArgs[j]];
                            }
                            if (paramValue !== undefined) {
                                funcArgs.push(paramValue);
                            }
                        }

                        try {
                            apiDefer.resolve(matched.func.apply($delegate, funcArgs));
                        } catch (ex) {
                            apiDefer.reject(ex);
                        }
                    }

                    $delegate.get = function (apiDefer) {
                        $timeout(function () {
                            invoke(apiDefer, map.getRoute('get', apiDefer.apis))
                        });
                        return apiDefer.promise;
                    };

                    $delegate.post = function (apiDefer, data) {
                        $timeout(function () {
                            invoke(apiDefer, map.getRoute('post', apiDefer.apis));
                        });
                        return apiDefer.promise;
                    };

                    $delegate.put = function (apiDefer, data) {
                        $timeout(function () {
                            invoke(apiDefer, map.getRoute('put', apiDefer.apis));
                        });
                        return apiDefer.promise;
                    };

                    $delegate.patch = function (apiDefer, data) {
                        $timeout(function () {
                            invoke(apiDefer, map.getRoute('patch', apiDefer.apis));
                        });
                        return apiDefer.promise;
                    };

                    $delegate.drop = function (apiDefer) {
                        $timeout(function () {
                            invoke(apiDefer, map.getRoute('drop', apiDefer.apis));
                        });
                        return apiDefer.promise;
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
});