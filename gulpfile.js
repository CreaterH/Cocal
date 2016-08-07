var gulp = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var colors = require("colors");
var Path = require("path");
var exec = require("child_process").exec;
var less = require("gulp-less");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var webserver = require("gulp-webserver");
var shell = require("gulp-shell");
var clean =require("gulp-clean");
var empty = require("gulp-empty");
var gulpif = require("gulp-if");
var argv = require("yargs").argv;
var _ = require('underscore');
var webpack = require("webpack");

var workspace = __dirname + "/";

var shims = {};

gulp.task('nowatch', function(cb){
    watch = empty;
    cb();
});

gulp.task('tpl', function(cb){
    var path = 'public/js/admin/tpl/**/*.html';
    gulp.src(path)
        .pipe(watch(path, {}, touchJsFiles))
        // .pipe(compipleTemplate)
        .pipe(gulp.dest('build/js/tpl'));
});

gulp.task('lib', function(){
    gulp.src(['public/js/lib/jquery.js',
            'public/js/lib/jquery-ui.js'
        ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(rename({
            basename:'lib.min'
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('js', ['tpl'], function(){
    var path = ['public/js/**/*.js', 'public/js/lib/*', 'public/js/**/*.json'];
    gulp.src(psth)
        .pipe(watch(path, {}, logVinyl))
        .pipe(plumber())
        .pipe(gulp.dest('build/js/'));
});

// gulp.task('less', function(){
//     var path = ['public/css/**/*.less'];
//     gulp.src(path)
//         .pipe(watch(path, {}, logVinyl))
//         .pipe(plumber())
//         .pipe(less())
//         .pipe(gulp.dest('build/css'));
// });

gulp.task('css', function(){
    var path = ['public/css/**/*.css'];
    gulp.src(path)
        .pipe(watch(path, {}, logVinyl))
        .pipe(gulp.dest('build/css'));
});

gulp.task('gif', function(){
    var path = ['src/less/**/*.gif', 'src/less/**/*.png', 'src/less/**/*.ico',];
    gulp.src(path)
        .pipe(watch(path, {}, logVinyl))
        .pipe(gulp.dest('build/css'));
});

gulp.task('html', function(){
    var path = 'public/html/**/*.*';
    gulp.src(path)
        .pipe(watch(path, {}, logVinyl))
        // .pipe(compileShim(function(file){
        //     shims[file] = true;
        // }))
        // .pipe(compilePlaceholder)
        .pipe(gulp.dest('build'));
});

gulp.task('shim', function(){
    console.log("recompile".yellow);
    _.each(shims, function(val, file){
        touchFile(file);
    });
});

gulp.task('img', function(){
    var path = 'public/images/**/*.*';

});

gulp.task('fonts', function(){

});

gulp.task('webpack', function(callback){
    var config = require('./webpack.config.js');
    // console.log("**************************   webpack  *****************************");
    webpack(config, function(err, status){
        console.log("**************************   webpack  *****************************");
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", status.toString({}));
        callback();
    });
});

gulp.task('webserver', function(){
    gulp.src('build')
        .pipe(webserver({
            livereload: false,
            directoryListing:{
                enable: true,
                path: 'build/'
            },
            open: true
        }));
});

gulp.task("express", shell.task([
    'supervisor -w database,routes,app.js -- ./bin/www  --dev --debug'
    // 'webpack-dev-server'
]));

gulp.task("clean", function(){
    gulp.src('./build')
    .pipe(clean());
});


function touchJsFiles(file){
    exec('touch ' + workspace + file);
}

function logVinyl(file){
    console.log('[' + (new Date().toTimeString().substring(0,8).gray) + ']', 'gulp compile:', Path.basename(file.path).green);
}

gulp.task('build', ['js', 'css', 'gif', 'html', 'img', 'fonts']);
gulp.task('default', ['build', 'express', 'webpack']);
gulp.task('release',['nowatch', 'build', 'webpack']);
gulp.task('test', ['nowatch', 'build']);
