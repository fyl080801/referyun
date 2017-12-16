define([
    'modules/trytest/module'
], function (module) {
    'use strict';

    module.filter('fieldType', [
        'modules/trytest/services/formService',
        function (formService) {
            return function (input) {
                var types = $.grep(formService.fieldTypes, function (item) {
                    return input === item['type'];
                });
                return types.length > 0 ? types[0].name : input;
            };
        }
    ]);
});