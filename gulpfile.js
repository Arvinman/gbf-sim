'use strict';

//*
var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('webserver', function () {
    connect.server();
});

gulp.task('default', ['webserver']);
//*/
/*
var gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
    root: ['public', 'build'],
    port: 80,

}));
*/