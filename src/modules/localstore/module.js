define([
    'app/application',
    'modules/localstore/configs/storeAdapter',
    'modules/localstore/configs/dataStore',
    'modules/yun/module'
], function (application) {
    'use strict';

    application.requires.push('modules.localstore');

    return angular
        .module('modules.localstore', [
            'modules.yun',
            'modules.localstore.configs'
        ]);
});