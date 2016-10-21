'use strict';
<% if (plugin.isSeparated) { %>
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');<% } %>
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var makepot = require('gulp-wp-pot');<% if (plugin.isSeparated) { %>
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');<% } %>
var sort = require('gulp-sort');<% if (plugin.isSeparated) { %>
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var scriptTasks = lazypipe()
  .pipe(plumber)
  .pipe(sourcemaps.init)
  .pipe(uglify)
  .pipe(sourcemaps.write);

var styleTasks = lazypipe()
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
  .pipe(sourcemaps.write);<% } %>

var i18nTasks = lazypipe()
  .pipe(sort)
  .pipe(makepot, {
    domain: '<%= plugin.name.fileName %>',
    destFile: '<%= plugin.name.fileName %>.pot',
    package: '<%= plugin.name.className %>',
    bugReport: '<%= plugin.website %>',
    lastTranslator: '<%= plugin.author.name %> <<%= plugin.author.email %>>',
    team: '<%= plugin.author.name %> <<%= plugin.author.email %>>'
  });<% if (plugin.isSeparated) { %>

gulp.task('clean:scripts:admin', function () {
  return del(['./admin/js/dist']);
});

gulp.task('clean:scripts:public', function () {
  return del(['./public/js/dist']);
});

gulp.task('clean:styles:admin', function () {
  return del(['./admin/css/dist']);
});

gulp.task('clean:styles:public', function () {
  return del(['./public/css/dist']);
});

gulp.task('clean', [
  'clean:scripts:admin',
  'clean:scripts:public',
  'clean:styles:admin',
  'clean:styles:public'
]);

gulp.task('scripts:admin', ['clean:scripts:admin'], function () {
  return gulp.src('./admin/js/<%= plugin.name.fileName %>-admin.js')
    .pipe(scriptTasks())
    .pipe(gulp.dest('./admin/js/dist'));
});

gulp.task('scripts:public', ['clean:scripts:public'], function () {
  return gulp.src('./public/js/<%= plugin.name.fileName %>-public.js')
    .pipe(scriptTasks())
    .pipe(gulp.dest('./public/js/dist'));
});

gulp.task('scripts', ['scripts:admin', 'scripts:public']);

gulp.task('styles:admin', ['clean:styles:admin'], function () {
  return gulp.src('./admin/scss/<%= plugin.name.fileName %>-admin.scss')
    .pipe(styleTasks())
    .pipe(gulp.dest('./admin/css'));
});

gulp.task('styles:public', ['clean:styles:public'], function () {
  return gulp.src('./public/scss/<%= plugin.name.fileName %>-public.scss')
    .pipe(styleTasks())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('styles', ['styles:admin', 'styles:public']);<% } %>

gulp.task('i18n', function () {
  return gulp.src('./**/*.php')
    .pipe(i18nTasks())
    .pipe(gulp.dest('./languages'));
});

gulp.task('default', [<% if (plugin.isSeparated) { %>
  'clean',
  'scripts',
  'styles',<% } %>
  'i18n'
]);
