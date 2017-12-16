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
    initDebug(config, options.noDebugs);
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

    function initDebug(config, nonDebugs) {
        var debug = app.getAttribute('data-debug') === 'true' ? '' : '.min';
        for (var index in config.paths) {
            var isDebug = true;
            for (var i in nonDebugs) {
                if (nonDebugs[i] === index) {
                    isDebug = false;
                    break;
                }
            }
            config.paths[index] = config.paths[index] + (isDebug ? debug : '');
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
        // modules
        'localyun.modules': {
            path: 'js/localyun.modules',
            shim: {
                deps: ['app/application']
            }
        },
        'trytest.modules': {
            path: 'js/trytest.modules',
            shim: {
                deps: ['app/application']
            }
        },

        // requires
        'modules/yun/requires': {
            path: 'js/modules.yun',
            shim: {
                deps: ['localyun.modules']
            }
        },
        'modules/manage/requires': {
            path: 'js/modules.manage',
            shim: {
                deps: ['localyun.modules', 'modules/yun/requires']
            }
        },
        'modules/member/requires': {
            path: 'js/modules.member',
            shim: {
                deps: ['localyun.modules', 'modules/yun/requires']
            }
        },
        'modules/trytest/requires': {
            path: 'js/modules.trytest',
            shim: {
                deps: ['trytest.modules']
            }
        },

        // references
        'metisMenu': {
            path: 'js/metisMenu',
            shim: {
                deps: ['api-check']
            }
        },
        'api-check': {
            path: 'js/api-check'
        },
        'ng-table': {
            path: 'js/ng-table',
            shim: {
                deps: ['app']
            }
        },
        'jquery-ui': {
            path: 'js/jquery-ui',
            shim: {
                deps: ['app']
            }
        },
        'angular-sanitize': {
            path: 'js/angular-sanitize',
            shim: {
                deps: ['app']
            }
        },
        'tv4': {
            path: 'js/tv4'
        },
        'objectpath': {
            path: 'js/ObjectPath'
        },
        'schema-form': {
            path: 'js/schema-form',
            shim: {
                deps: ['angular-sanitize', 'tv4', 'objectpath']
            }
        },
        'schema-form-bootstrap': {
            path: 'js/bootstrap-decorator',
            shim: {
                deps: ['schema-form']
            }
        }
    },
    requires: [
        'rcss!css/font-awesome.min.css',
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