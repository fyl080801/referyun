define('modules.manage.configs.rootScope', [
    'modules.manage.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('$rootScope', [
                '$delegate',
                '$yun',
                function ($delegate, $yun) {
                    $delegate.$yun = $yun;
                    return $delegate;
                }
            ]);
        }
    ]);
});