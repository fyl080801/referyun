require.config({
    removeCombined: true,
    fileExclusionRegExp: /^\./,
    paths: {
        'ng-table': '../bower_components/ng-table/dist/ng-table.min',
        'metisMenu': 'js/metisMenu.min',
        'angular': '../bower_components/angular/angular.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'schema-form': '../bower_components/angular-schema-form/dist/schema-form.min',
        'schema-form-bootstrap': '../bower_components/angular-schema-form-bootstrap/bootstrap-decorator.min',
        'tv4': '../bower_components/tv4/tv4',
        'objectpath': '../bower_components/objectpath/lib/ObjectPath',
        'app/application': 'js/app.application.min'
    },
    shim: {},
    exclude: [
        'metisMenu',
        'angular-sanitize',
        'schema-form',
        'schema-form-bootstrap',
        'tv4',
        'objectpath',
        'app/application'
    ]
});