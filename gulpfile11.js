/**
 * Create by Piny
 * 自动构建工具 Gulp
 */
var gulp = require('gulp'),
    webpack = require('webpack'),
    connect = require('gulp-connect'),
    shell = require('gulp-shell'),
    clean = require('gulp-clean'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

gulp.task("webpack", function(){
    var config = require('./webpack.config.js');
    webpack(config, function(){
        // console.log("webpack is running!");
    });
});

gulp.task('scripts', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('dist/scripts'))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.watch("./pubilc/html/**/*.html", ["webpack"]);
gulp.watch("./public/js/**/*.js", ['webpack']);

gulp.task("express", shell.task([
    'supervisor ./bin/www'
]));

gulp.task("clean", function(){
    gulp.src('./build')
    .pipe(clean());
});

gulp.task('default', ['webpack', 'express']);
