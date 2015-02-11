var gulp = require('gulp'),
    less = require('gulp-less'),
    concatCSS = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    requireDir = require('require-dir'),
    dir = requireDir('./tasks');

//connect
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

//html
gulp.task('html', function() {
    gulp.src('./app/html/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(connect.reload());
});

//bootstrap
gulp.task('bootstrap', function() {
    gulp.src('./app/less/bootstrap.less')
        .pipe(less())
        .pipe(rename("bootstrap-atikhobaev.min.css"))
        .pipe(gulp.dest('./app/css/'))
        .pipe(connect.reload());
});

//less
gulp.task('less', function() {
    gulp.src('./app/less/compilation.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(rename("style.css"))
        .pipe(gulp.dest('./app/css/'))
        .pipe(minifyCSS(''))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('./app/css/'))
        .pipe(connect.reload());
});

//watch
gulp.task('watch', function() {
    gulp.watch(['./app/html/*.html'], ['html']);
    gulp.watch(['./app/html/src/*.html'], ['html']);
    gulp.watch(['./app/less/bootstrap.less'], ['bootstrap']);
    gulp.watch(['./app/less/src/*.less'], ['less']);
});

//default
gulp.task('default', ['connect', 'html', 'bootstrap', 'less', 'watch']);
