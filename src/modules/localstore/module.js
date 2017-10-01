define([
    'app/application',
    'modules/yun/module',
    'modules/localstore/configs/storeAdapter',
    'modules/localstore/configs/dataStore',
    //
    'modules/localstore/providers/app'
], function (application) {
    'use strict';

    application.requires.push('modules.localstore');

    return angular
        .module('modules.localstore', [
            'modules.yun',
            'modules.localstore.configs',
            'modules.localstore.providers'
        ]);
});