define('modules.manage.directives.ngRepeated', [
    'modules.manage.module'
], function (module) {
    'use strict';

    module.directive('ngRepeated', [
        '$timeout',
        function ($timeout) {
            var _link = function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeated');
                    });
                }

                // if (scope.$last === true) {
                //     eval(attr.ngRepeated);
                // }
            };

            return {
                restrict: 'A',
                link: _link
            };
        }
    ]);
});