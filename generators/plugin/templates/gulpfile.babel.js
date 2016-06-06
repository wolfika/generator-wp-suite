'use strict';

const gulp = require('gulp');
const makepot = require('gulp-wp-pot');
const sort = require('gulp-sort');

gulp.task('i18n', () => {
  return gulp.src('./**/*.php')
    .pipe(sort())
    .pipe(makepot({
      domain: '<%= plugin.name.fileName %>',
      destFile:'<%= plugin.name.fileName %>.pot',
      package: '<%= plugin.name.className %>',
      bugReport: '<%= plugin.website %>',
      lastTranslator: '<%= plugin.author.name %> <<%= plugin.author.email %>>',
      team: '<%= plugin.author.name %> <<%= plugin.author.email %>>'
    }))
    .pipe(gulp.dest('languages'));
});

gulp.task('default', ['i18n']);
