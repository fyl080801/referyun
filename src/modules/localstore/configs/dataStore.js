define([
    'modules/localstore/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$dataStore', {
                /**
                 * Id,
                 * AppName,
                 * Enabled
                 */
                apps: [],

                /**
                 * Id
                 * AppId
                 * ParentId
                 * Name
                 * Path
                 */
                groups: [],

                /**
                 * 
                 */
                roles: [],

                /**
                 * 
                 */
                users: [],

                /**
                 * 
                 */
                launchers: [],

                /**
                 * 
                 */
                orgs: [],

                /**
                 * Id       int
                 * AppId    int
                 * Name     string
                 */
                forms: []
            });
        }
    ]);
});