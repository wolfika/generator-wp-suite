'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var nsp = require('gulp-nsp');
var filter = require('gulp-filter');

var generatorJs = filter(['generators/**/*.js', '!generators/**/templates/**/*']);

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(generatorJs)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', '!generators/**/templates/**/*'], ['static']);
});

gulp.task('prepare', ['nsp']);
gulp.task('default', ['static']);
