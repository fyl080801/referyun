(function (options) {
    'use strict';

    var requires = ['app/application'],
        config = {
            urlArgs: app.getAttribute('data-args'),
            paths: {
                'patch': 'js/patch',
                'rcss': 'js/app',
                'angular': 'js/app',
                'app': 'js/app',
                //
                'app/application': 'js/app.application'
            },
            shim: {
                'app/application': {
                    deps: ['app']
                }
            }
        };

    initBrowserPatch(config);
    initReference(requires, config, options.references);
    initModules(requires, options);
    startup(requires, config);

    function startup(requires, config) {
        require.config(config);
        require(requires, function (application) {
            angular.element(document).ready(function () {
                angular.element(document).find('html')
                    .attr('id', 'ng-app')
                    .attr('ng-app', 'app.application');
                angular.bootstrap(document, ['app.application']);
            });
        });
    }

    function initReference(requires, config, references) {
        for (var name in references) {
            var reference = references[name];
            var referenceType = Object.prototype.toString.call(reference);
            if (referenceType === '[object Object]') {
                config.paths[name] = reference.path;
                if (reference.shim)
                    config.shim[name] = reference.shim;
                if (reference.required) {
                    requires.push(name);
                }
            } else if (referenceType === '[object String]') {
                config.paths[name] = reference;
            }
        }
    }

    function initModules(requires, options) {
        for (var idx in options.requires) {
            requires.push(options.requires[idx]);
        }
    }

    function initBrowserPatch(config) {
        if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8') {
            config.shim.app = {
                deps: ['patch']
            };
            config.shim.rcss = {
                deps: ['patch']
            };
        }
    }
})({
    app: document.getElementById('app'),
    references: {
        'metisMenu': {
            path: 'js/metisMenu',
            shim: {
                deps: ['api-check']
            }
        },
        'api-check': {
            path: '../bower_components/api-check/dist/api-check',
            shim: {
                deps: ['jquery']
            }
        },
        'ng-table': {
            path: 'js/ng-table',
            shim: {
                deps: ['angular']
            }
        },
        'jquery-ui': {
            path: '../bower_components/jquery-ui/jquery-ui',
            shim: {
                deps: ['jquery']
            }
        }
    },
    requires: [
        'rcss!css/metisMenu.min.css',
        'rcss!../bower_components/font-awesome/css/font-awesome.min.css',
        'rcss!css/yun.css',
        'modules'
    ],
    noDebugs: []
});