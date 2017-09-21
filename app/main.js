/**
 * Created by fyl08 on 2016/12/22.
 */
(function (app, options) {
    'use strict';

    var requires = ['app.application'],
        config = {
            urlArgs: app.getAttribute('data-args'),
            paths: {
                'patch': 'js/patch',
                'angular': 'js/app',
                'app': 'js/app',
                'app.application': 'js/app.application'
            },
            shim: {
                'app.application': {
                    deps: ['app']
                }
            }
        };

    initBrowserPatch(config);
    initReference(requires, config, options.references);
    initModules(requires, options.required);
    initDebug(config, options.noDebugs);
    startup(requires, config);

    function startup(requires, config) {
        require.config(config);
        require(requires, function (application) {
            angular.element(document).ready(function () {
                angular.bootstrap(document, ['app.application']);
                angular.element(document).find('html')
                    .attr('id', 'ng-app')
                    .attr('ng-app', 'app.application')
                    .attr('data-index', app.getAttribute('data-index'));
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

    function initModules(requires, required) {
        for (var idx in required) {
            requires.push(required[idx]);
        }
    }

    function initDebug(config, nonDebugs) {
        var debug = eval(app.getAttribute('data-debug')) ? '' : '.min';
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
        if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8')
            config.shim.app = {
                deps: ['patch']
            };
    }
})(document.getElementById('app'), {
    references: {
        // modules
        'modules.manage.module': {
            path: 'js/modules'
        },

        // requires
        'modules.manage.requires': {
            path: 'js/module.manage',
            shim: {
                deps: ['modules.manage.module']
            }
        },

        // third plugin
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
        }
    },
    required: [
        'modules.manage.module'
    ],
    noDebugs: []
});