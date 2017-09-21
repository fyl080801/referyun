/// <binding Clean='clean' />
'use strict';

var appRoot = './app',
    bowerRoot = './bower_components',
    jsTarget = './app/js',
    cssTarget = './app/css',
    fontTarget = './app/fonts',
    imgTarget = './app/images',
    modulePath = './src/modules',
    referenceConfig = './src/reference.json';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    minimist = require('minimist'),
    amdOptimize = require('amd-optimize'),
    webserver = require('gulp-webserver'),
    fs = require('fs');

/**
 * 用于pack_modules的参数
 */
var moduleOptions = {
    string: 'p',
    default: {
        p: null
    }
};

/**
 * 打包require
 */
gulp.task('pack_require', function () {
    gulp.src(bowerRoot + '/requirejs/require.js')
        .pipe(concat('require.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('require.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包兼容性补丁
 */
gulp.task('pack_patch', function () {
    var paths = ['./src/patch.js'];
    gulp.src(paths)
        .pipe(amdOptimize('patch', {
            name: 'iepatch',
            configFile: './src/patch.js',
            baseUrl: './src'
        }))
        .pipe(concat('patch.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('patch.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包主体库
 */
gulp.task('pack_app', function () {
    var paths = ['./src/app.js'];
    gulp.src(paths)
        .pipe(amdOptimize('app', {
            name: 'app',
            configFile: './src/app.js',
            baseUrl: './src'
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('app.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包引用库
 */
gulp.task('pack_reference', function () {
    var reference = JSON.parse(fs.readFileSync(referenceConfig));
    for (var name in reference) {
        var ref = reference[name];
        doTarget(ref.js, jsTarget);
        doTarget(ref.css, cssTarget);
        doTarget(ref.fonts, fontTarget);
        doTarget(ref.images, imgTarget);
    }

    function doTarget(lib, target) {
        if (!lib || !target) return;
        gulp.src(lib)
            .pipe(gulp.dest(target));
    }
});

/**
 * 打包应用框架
 */
gulp.task('pack_src', function () {
    gulp.src('./src/app/**/*.js')
        .pipe(concat('app.application.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('app.application.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包模块
 */
gulp.task('pack_modules', function () {
    var modules = fs.readdirSync(modulePath),
        packOptions = minimist(process.argv.slice(2), moduleOptions),
        target = packOptions.p ? './publish' : jsTarget,
        config = packOptions.p ? JSON.parse(fs.readFileSync(packOptions.p)) : {
            name: null,
            modules: []
        },
        packs = [
            './src/modules/**/module.js',
            './src/modules/**/configs.js',
            './src/modules/**/configs/**/*.js'
        ],
        moduleFile = config.name ? 'modules.' + config.name + '.js' : 'modules.js',
        minFile = config.name ? 'modules.' + config.name + '.min.js' : 'modules.min.js';

    for (var idx in modules) {
        if (config.modules.length > 0 && config.modules.indexOf(modules[idx]) < 0)
            continue;
        var arr = ['./src/modules/' + modules[idx] + '/**/*.js'];
        for (var i in packs) {
            arr.push('!' + packs[i]);
        }
        gulp.src(arr)
            .pipe(concat('module.' + modules[idx] + '.js'))
            .pipe(gulp.dest(target))
            .pipe(concat('module.' + modules[idx] + '.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(target));
    }

    var publishModule = [];
    for (var idx in config.modules) {
        publishModule.push('./src/modules/' + config.modules[idx] + '/module.js');
        publishModule.push('./src/modules/' + config.modules[idx] + '/configs.js');
        publishModule.push('./src/modules/' + config.modules[idx] + '/configs/**/*.js');
    }

    gulp.src(publishModule.length > 0 ? publishModule : packs)
        .pipe(concat(moduleFile))
        .pipe(gulp.dest(target))
        .pipe(concat(minFile))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(target));
});

/**
 * 执行build
 */
gulp.task('build', ['pack_require', 'pack_reference', 'pack_patch', 'pack_app', 'pack_src', 'pack_modules']);

/**
 * 启动server
 */
gulp.task('start', function () {
    gulp.src(appRoot)
        .pipe(webserver({
            fallback: '/',
            livereload: false,
            port: 7997,
            directoryListing: false,
            open: false
        }));
});

gulp.task('watch', function () {
    gulp.watch('doc/*.md', function () {
        gulp.run('md');
    });
});

gulp.task('default', function () {
    gulp.run('build');
    gulp.run('start');
    gulp.run('watch');
});