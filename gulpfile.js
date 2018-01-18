/**
 * 基本路径
 */
var jsTarget = 'dist/js',
    cssTarget = 'dist/css',
    fontTarget = 'dist/fonts',
    imgTarget = 'dist/images';

/**
 * 模块定义
 */
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
 * 打包require
 */
gulp.task('pack_require', function () {
    gulp.src('bower_components/requirejs/require.js')
        .pipe(concat('require.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('require.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包静态文件
 */
gulp.task('pack_resources', function () {
    gulp.src([
            'resources/**/*',
            'src/**/*',
            '!src/modules/**/*.js',
            '!src/*.build.js',
            '!src/*.modules.js',
            '!src/app',
            '!src/index.html',
            '!src/reference.json',
            '!src/main.js'
        ])
        .pipe(gulp.dest('dist'));

    var reference = JSON.parse(fs.readFileSync('config/reference.json'));

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
 * 打包模块
 */
gulp.task('pack_modules', function () {
    var modules = fs.readdirSync('src/modules');
    var builds = fs.readdirSync('src')
        .filter(function (file) {
            return file.endsWith('.modules.js');
        });

    for (var idx in modules) {
        var requiresPath = 'modules/' + modules[idx] + '/requires';
        var requiresName = 'modules.' + modules[idx];

        gulp.src('src/**/*.js')
            .pipe(amdOptimize(requiresPath, {
                configFile: 'config/requires.build.js',
                baseUrl: 'src'
            }))
            .pipe(concat(requiresName + '.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(concat(requiresName + '.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(jsTarget));
    }

    for (var idx in builds) {
        var buildFile = builds[idx];
        var buildName = buildFile.replace('.modules.js', '');

        gulp.src('src/**/*.js')
            .pipe(amdOptimize(buildName + '.modules', {
                configFile: 'config/modules.build.js',
                baseUrl: 'src'
            }))
            .pipe(concat(buildName + '.modules.js'))
            .pipe(gulp.dest(jsTarget))
            .pipe(concat(buildName + '.modules.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(jsTarget));
    }
});

/**
 * 执行build
 */
gulp.task('build', ['pack_require', 'pack_resources', 'pack_modules']);

/**
 * 启动server
 */
gulp.task('start', function () {
    gulp.src('')
        .pipe(webserver({
            fallback: 'src/index.html',
            livereload: false,
            port: 8998,
            directoryListing: false,
            open: false
        }));
});