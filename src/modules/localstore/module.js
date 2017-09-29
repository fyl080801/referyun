define([
    'app/application',
    'modules/localstore/configs/storeAdapter',
    'modules/localstore/configs/dataStore'
], function (application) {
    'use strict';

    application.requires.push('modules.localstore');

    return angular
        .module('modules.localstore', [
            'modules.localstore.configs'
        ]);
});