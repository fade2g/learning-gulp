'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var gulpif = require('gulp-if');
var sprite = require('css-sprite').stream;

gulp.task('default', function () {
	console.log('default task');
});

gulp.task('process-styles', function () {
	return gulp.src('css/src/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/dest/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./css/dest/'));
});

gulp.task('process-scripts', function () {
  return gulp.src('js/src/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/dest/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js/dest/'));
});

gulp.task('watch', function() {
  gulp.watch('js/src/*.js', ['process-scripts']);
  gulp.watch('css/src/*.styl', ['process-styles']);
});

// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
  return gulp.src('img/src/*.png')
    .pipe(sprite({
      name: 'sprite.png',
      style: '_sprite.styl',
      cssPath: '../../img/dest/',
      processor: 'stylus',
      retina: true
    }))
    .pipe(gulpif('*.png', gulp.dest('img/dest/'), gulp.dest('css/src/')))
});
