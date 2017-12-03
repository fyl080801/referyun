define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    configs.config([
        'modules.localstore.providers.mapProvider',
        function (mapProvider) {
            mapProvider.addRoute('get', '/app/{appid}', 'modules.localstore.services.app', 'getApp');
        }
    ]);
});