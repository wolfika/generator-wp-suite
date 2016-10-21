'use strict';
<% if (util.hasAdminOrPublic()) { %>
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');<% } %>
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var makepot = require('gulp-wp-pot');<% if (util.hasAdminOrPublic()) { %>
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');<% } %>
var sort = require('gulp-sort');<% if (util.hasAdminOrPublic()) { %>
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
  });<% if (util.hasAdmin()) { %>

gulp.task('clean:scripts:admin', function () {
  return del(['./admin/js/dist']);
});<% } %><% if (util.hasPublic()) { %>

gulp.task('clean:scripts:public', function () {
  return del(['./public/js/dist']);
});<% } %><% if (util.hasAdmin()) { %>

gulp.task('clean:styles:admin', function () {
  return del(['./admin/css/dist']);
});<% } %><% if (util.hasPublic()) { %>

gulp.task('clean:styles:public', function () {
  return del(['./public/css/dist']);
});<% } %><% if (util.hasAdminOrPublic()) { %>

gulp.task('clean', [<% if (util.hasAdmin()) { %>
  'clean:scripts:admin',<% } %><% if (util.hasPublic()) { %>
  'clean:scripts:public',<% } %><% if (util.hasAdmin()) { %>
  'clean:styles:admin',<% } %><% if (util.hasPublic()) { %>
  'clean:styles:public'<% } %>
]);<% } %><% if (util.hasAdmin()) { %>

gulp.task('scripts:admin', ['clean:scripts:admin'], function () {
  return gulp.src('./admin/js/<%= plugin.name.fileName %>-admin.js')
    .pipe(scriptTasks())
    .pipe(gulp.dest('./admin/js/dist'));
});<% } %><% if (util.hasPublic()) { %>

gulp.task('scripts:public', ['clean:scripts:public'], function () {
  return gulp.src('./public/js/<%= plugin.name.fileName %>-public.js')
    .pipe(scriptTasks())
    .pipe(gulp.dest('./public/js/dist'));
});<% } %><% if (util.hasAdminOrPublic()) { %>

gulp.task('scripts', [<% if (util.hasAdmin()) { %>'scripts:admin', <% } %><% if (util.hasPublic()) { %>'scripts:public'<% } %>]);<% } %><% if (util.hasAdmin()) { %>

gulp.task('styles:admin', ['clean:styles:admin'], function () {
  return gulp.src('./admin/scss/<%= plugin.name.fileName %>-admin.scss')
    .pipe(styleTasks())
    .pipe(gulp.dest('./admin/css'));
});<% } %><% if (util.hasPublic()) { %>

gulp.task('styles:public', ['clean:styles:public'], function () {
  return gulp.src('./public/scss/<%= plugin.name.fileName %>-public.scss')
    .pipe(styleTasks())
    .pipe(gulp.dest('./public/css'));
});<% } %><% if (util.hasAdminOrPublic()) { %>

gulp.task('styles', [<% if (util.hasAdmin()) { %>'styles:admin', <% } %><% if (util.hasPublic()) { %>'styles:public'<% } %>]);<% } %>

gulp.task('i18n', function () {
  return gulp.src('./**/*.php')
    .pipe(i18nTasks())
    .pipe(gulp.dest('./languages'));
});

gulp.task('default', [<% if (util.hasAdminOrPublic()) { %>
  'clean',
  'scripts',
  'styles',<% } %>
  'i18n'
]);
