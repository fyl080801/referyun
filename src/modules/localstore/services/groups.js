define([
    'modules/localstore/services'
], function (services) {
    'use strict';

    services
        .config([
            'modules.localstore.providers.mapProvider',
            function (mapProvider) {
                mapProvider.addRoute('get', '/app/{appid}/group', 'modules.localstore.services.groups', 'list');
                mapProvider.addRoute('put', '/group', 'modules.localstore.services.groups', 'updateGroup');
                mapProvider.addRoute('post', '/group', 'modules.localstore.services.groups', 'addGroup');
                mapProvider.addRoute('drop', '/group/{groupid}', 'modules.localstore.services.groups', 'deleteGroup');
            }
        ])
        .service('modules.localstore.services.groups', [
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
                    data.Path = data.Path ? data.Path + '/' + data.Id : data.Id;
                    $dataStore.groups.push(data);
                };

                this.updateGroup = function (data) {
                    $.each($dataStore.groups, function (idx, item) {
                        if (item.Id + '' === data.Id) {
                            $dataStore.groups[idx] = data;
                            return false;
                        }
                    });
                };

                this.deleteGroup = function (groupid) {
                    var group = $.grep($dataStore.groups, function (item) {
                        return item.Id === groupid;
                    })[0];
                    for (var i = $dataStore.groups.length - 1; i >= 0; i--) {
                        if ($dataStore.groups[i].Path.indexOf(group.Path) === 0) {
                            $dataStore.groups.splice(i, 1);
                        }
                    }
                };
            }
        ]);
});