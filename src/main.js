(function (options) {
    'use strict';

    var requires = ['app/application'],
        config = {
            urlArgs: options.app.getAttribute('data-args'),
            paths: {
                'patch': 'js/patch',
                'rcss': 'js/app',
                'angular': 'js/app',
                'app': 'js/app',
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
        'director': {
            path: 'js/director',
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
        },
        'angular-sanitize': {
            path: '../bower_components/angular-sanitize/angular-sanitize',
            shim: {
                deps: ['app']
            }
        },
        'tv4': {
            path: '../bower_components/tv4/tv4'
        },
        'objectpath': {
            path: '../bower_components/objectpath/lib/ObjectPath'
        },
        'schema-form': {
            path: '../bower_components/angular-schema-form/dist/schema-form',
            shim: {
                deps: ['angular-sanitize', 'tv4', 'objectpath']
            }
        },
        'schema-form-bootstrap': {
            path: '../bower_components/angular-schema-form-bootstrap/bootstrap-decorator',
            shim: {
                deps: ['schema-form']
            }
        },
        'signalr': {
            path: '../bower_components/signalr/jquery.signalR',
            shim: {
                deps: ['app']
            }
        },
        'angular-signalr-hub': {
            path: '../bower_components/angular-signalr-hub/signalr-hub',
            shim: {
                deps: ['signalr']
            }
        }
    },
    requires: [
        'rcss!../bower_components/font-awesome/css/font-awesome.min.css',
        'rcss!css/metisMenu.min.css',
        'rcss!css/yun.css',
        'localyun.modules',
        'trytest.modules'
    ],
    noDebugs: [
        'tv4',
        'objectpath'
    ]
});