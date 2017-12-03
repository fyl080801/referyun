define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$dataStore', {
                apps: [],
                groups: [],
                roles: [],
                users: [],
                launchers: [],
                orgs: [],
                forms: []
            });
        }
    ]);
});