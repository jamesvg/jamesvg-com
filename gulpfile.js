/**
 * to run:
 * npx gulp
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var inlineSource = require('gulp-inline-source');
var htmlMin = require('gulp-htmlmin');

gulp.task('clean', function () {
  return gulp.src('./src/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('./'));
});

gulp.task('default', function(){
    browserSync.init({
        watch: true,
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/*', gulp.series(['clean', 'inline', 'minify']));
});

gulp.task('inline', function () {
    return gulp.src('./src/*.html')
        .pipe(inlineSource())
        .pipe(gulp.dest('./'));
});

gulp.task('minify', function () {
    return gulp.src('./*.html')
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'));
});
