/**
 * standard gulp build file for browser client projects
 */

'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    del = require('del'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    map = require('map-stream'),
    fs = require('vinyl-fs');

var errorHandler = function(err) {
    gutil.beep();
    console.log( err );
};

var paths = {
    src: 'lib/*.js',
    tests: 'test/*.js'
};

gulp.task('jshint', function() {
    gulp.src([ paths.src, paths.tests ], { read:false } )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('mocha', function() {
    gulp.src( paths.tests, { read:false } )
        .pipe( plumber({ errorHandler:errorHandler }) )
        .pipe( mocha({ reporter:'spec' }) );
});

gulp.task('test', [ 'mocha', 'jshint' ] );

gulp.task('watch', [ 'test' ], function () {
    gulp.watch([ paths.src, paths.tests ], [ 'test' ]);
});

gulp.task('default', [ 'test', 'watch' ]);

