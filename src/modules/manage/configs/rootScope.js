define([
    'modules/manage/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('$rootScope', [
                '$delegate',
                '$yun',
                '$yunEnums',
                function ($delegate, $yun, $yunEnums) {
                    $delegate.$ = $;
                    $delegate.$yun = $yun;
                    $delegate.$yunEnums = $yunEnums;
                    return $delegate;
                }
            ]);
        }
    ]);
});