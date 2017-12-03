define([
    'app/application',
    'modules/yun/module',
    'modules/localstore/providers/map',
    'modules/localstore/configs/storeAdapter',
    'modules/localstore/configs/dataStore',
    // business
    'modules/localstore/services/app'
], function (application) {
    'use strict';

    application.requires.push('modules.localstore');

    return angular
        .module('modules.localstore', [
            'modules.yun',
            'modules.localstore.providers',
            'modules.localstore.configs',
            'modules.localstore.services'
        ])
        .config([
            'modules.localstore.providers.mapProvider',
            function (mapProvider) {
                mapProvider.addRoute('get', '/app/{appid}', function (appid) {

                });
            }
        ]);
});