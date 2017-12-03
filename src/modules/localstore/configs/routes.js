define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    configs.config([
        'modules.localstore.providers.mapProvider',
        function (mapProvider) {
            // app
            mapProvider.addRoute('get', '/app', 'modules.localstore.services.app', 'list');
            mapProvider.addRoute('post', '/app', 'modules.localstore.services.app', 'addApp');
            mapProvider.addRoute('get', '/app/{appid}', 'modules.localstore.services.app', 'getApp');
            mapProvider.addRoute('drop', '/app/{appid}', 'modules.localstore.services.app', 'deleteApp');

            // groups
            mapProvider.addRoute('get', '/app/{appid}/group', 'modules.localstore.services.groups', 'list');
            mapProvider.addRoute('post', '/app/{appid}/group', 'modules.localstore.services.groups', 'addGroup');
        }
    ]);
});