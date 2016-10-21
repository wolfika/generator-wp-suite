'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const lazypipe = require('lazypipe');
const makepot = require('gulp-wp-pot');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sort = require('gulp-sort');
const sourcemaps = require('gulp-sourcemaps');

const scssTasks = lazypipe()
  .pipe(plumber)
  .pipe(sourcemaps.init)
  .pipe(sass)
  .pipe(postcss, [
    autoprefixer({
      browsers: [
        'last 2 versions'
      ]
    }),
    cssnano({
      safe: true
    })
  ])
  .pipe(sourcemaps.write);

gulp.task('scss:admin', () => {
  return gulp.src('./admin/scss/<%= plugin.name.fileName %>-admin.scss')
    .pipe(scssTasks())
    .pipe(gulp.dest('./admin/css'));
});

gulp.task('scss:public', () => {
  return gulp.src('./public/scss/<%= plugin.name.fileName %>-public.scss')
    .pipe(scssTasks())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('scss', ['scss:admin', 'scss:public']);

gulp.task('i18n', () => {
  return gulp.src('./**/*.php')
    .pipe(sort())
    .pipe(makepot({
      domain: '<%= plugin.name.fileName %>',
      destFile: '<%= plugin.name.fileName %>.pot',
      package: '<%= plugin.name.className %>',
      bugReport: '<%= plugin.website %>',
      lastTranslator: '<%= plugin.author.name %> <<%= plugin.author.email %>>',
      team: '<%= plugin.author.name %> <<%= plugin.author.email %>>'
    }))
    .pipe(gulp.dest('languages'));
});

gulp.task('default', [
  'scss',
  'i18n'
]);
