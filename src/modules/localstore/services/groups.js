define([
    'modules/localstore/services'
], function (services) {
    'use strict';

    services.service('modules.localstore.services.groups', [
        '$dataStore',
        'modules.localstore.services.app',
        'modules.localstore.factories.utility',
        function ($dataStore, app, utility) {
            this.list = function (appid) {
                return $.grep($dataStore.groups, function (item) {
                    return item.AppId === appid;
                });
            };

            this.addGroup = function (data) {
                data.Id = utility.uid();
                $dataStore.groups.push(data);
            };

            // this.addApp = function (data) {
            //     data.appId = utility.uid();
            //     $dataStore.apps.push(data);
            //     return data;
            // };

            // this.getApp = function (appid) {
            //     if (appid && appid !== '') {
            //         return $.grep($dataStore.apps, function (item) {
            //             return item.appId === appid;
            //         })[0];
            //     } else if ($dataStore.apps.length > 0) {
            //         return $dataStore.apps[0];
            //     } else {
            //         return null;
            //     }
            // };

            // this.deleteApp = function (appid) {
            //     $.each($dataStore.apps, function (idx, item) {
            //         if (item.appId + '' === appid) {
            //             $dataStore.apps.splice(idx, 1);
            //             return false;
            //         }
            //     });
            // };
        }
    ]);
});