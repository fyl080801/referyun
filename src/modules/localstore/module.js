define([
    'app/application',
    'modules/yun/module',
    'modules/localstore/providers/map',
    'modules/localstore/configs/storeAdapter',
    'modules/localstore/configs/dataStore',
    'modules/localstore/factories/utility',
    // business
    'modules/localstore/services/app',
    'modules/localstore/services/groups',
    'modules/localstore/services/forms',
    'modules/localstore/services/role'
], function (application) {
    'use strict';

    application.requires.push('modules.localstore');

    return angular
        .module('modules.localstore', [
            'modules.yun',
            'modules.localstore.providers',
            'modules.localstore.configs',
            'modules.localstore.factories',
            'modules.localstore.services'
        ]);
});