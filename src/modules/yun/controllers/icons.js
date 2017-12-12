define([
    'modules/yun/module'
], function (module) {
    'use strict';

    module.controller('modules.yun.controllers.icons', [
        '$scope',
        function ($scope) {
            $scope.icons = [
                'glyphicon glyphicon-asterisk',
                'glyphicon glyphicon-cloud',
                'glyphicon glyphicon-envelope',
                'glyphicon glyphicon-glass',
                'glyphicon glyphicon-music',
                'glyphicon glyphicon-search',
                'glyphicon glyphicon-heart',
                'glyphicon glyphicon-star',
                'glyphicon glyphicon-star-empty',
                'glyphicon glyphicon-film'
            ];
        }
    ]);
});