'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    jslint = require('gulp-jslint'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

// Clean/Remove dist
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

// Copy html into dist
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'));
})

/* Compile SASS with Sourcemaps, autoprefixer for various browsers,
log errors, minify, rename to styles.css and copy to dist/css */
gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist/css/'))
});

// Copy vendor js to dist/js
gulp.task('vendor-js', function() {
    return gulp.src('src/js/vendor/*.js')
        .pipe(gulp.dest('./dist/js/vendor'));
});

/* Compile js with sourcemaps, catch errors with plumber, rename to app.js,
minify and copy to dist/js */
gulp.task('js', function() {
    return gulp.src('src/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(plumber({
              errorHandler: function (err) {
                  console.log(err);
                  this.emit('end');
              }
        }))
        .pipe(concat('app.js'))
        .pipe(minify({ext:{
            min:'.min.js'
        }}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});

// Watch changes for html, sass and js
gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/js/vendor/*.js', ['vendor-js']);
});

gulp.task('build', ['clean'], function () {
  gulp.start('html', 'sass', 'js', 'vendor-js');
});

gulp.task('default', ['build']);
