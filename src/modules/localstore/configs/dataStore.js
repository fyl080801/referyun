define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$dataStore', {
                apps: [],
                roles: [],
                users: [],
                launchers: [],
                orgs: [],
                forms: []
            });
        }
    ]);
});