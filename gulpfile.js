'use strict';

var gulp = require('gulp');
var docco = require('gulp-docco');
var subtree = require('gulp-subtree');
var rimraf = require('gulp-rimraf');
var karma = require('karma').server;

var exec = require('child_process').exec;

var opts = {
  karma: {
    browsers: ['PhantomJS'],
    frameworks: ['jasmine-ajax', 'jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-file-uploader.js',
      'test.js'
    ],
    singleRun: true
  }
};

gulp.task('default', ['test', 'watch']);

gulp.task('test', function (done) {
  karma.start(opts.karma, done);
});

gulp.task('watch', function () {
  var watcher = gulp.watch(['*.js'], ['test']);
  watcher.on('change', function(event) {
      console.log('File '+event.path+' was '+event.type+', running tasks...');
  });
});

gulp.task('clean-docs', function () {
  return gulp
    .src(['docs/', 'man/*.html', 'man/*.3'], {read: false})
    .pipe(rimraf());
});

gulp.task('make-man', ['clean-docs'], function (cb) {
  exec('ronn man/*.ronn', cb);
});

gulp.task('make-docco', ['clean-docs'], function () {
  return gulp
    .src(['angular-file-uploader.js'])
    .pipe(docco({
      layout: 'linear'
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('make-docs', ['make-man', 'make-docco']);

gulp.task('publish-docs', ['make-docs'], function () {
  return gulp
    .src('docs')
    .pipe(subtree({
      remote: 'github',
      message: 'Updating docs'
    }));
});


gulp.task('docs', ['clean-docs', 'make-docs', 'publish-docs']);

gulp.task('push', function (cb) {
  exec('git push github --all; git push github --tags; git push bitbucket --all; git push bitbucket --tags', function (err) {
    cb(err);
  });
});

gulp.task('publish', ['docs', 'push']);
