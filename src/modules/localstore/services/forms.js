define([
    'modules/localstore/services'
], function (services) {
    'use strict';

    services
        .config([
            'modules.localstore.providers.mapProvider',
            function (mapProvider) {
                mapProvider.addRoute('post', '/app/{appid}/form', 'modules.localstore.services.forms', 'addForm');
            }
        ])
        .service('modules.localstore.services.forms', [
            '$dataStore',
            'modules.localstore.factories.utility',
            function ($dataStore, utility) {
                this.addForm = function (data, appid) {
                    data.Id = utility.uid();
                    data.AppId = appid;
                    $dataStore.forms.push(data);
                    return $.extend({}, data);
                };
            }
        ]);
});