const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

const sassConfig = {
    includePaths: ['./node_modules']
};

gulp.task('sass:main', function () {
    return gulp.src('src/scss/main/index.scss')
      .pipe(sourcemaps.init())
      .pipe(sass(sassConfig))
      .pipe(rename(function (file) {
        file.basename = "main";
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('assets'));
});

gulp.task('sass:components', function () {
    return gulp.src('src/scss/components/*/index.scss')
      .pipe(sassGlob())
      .pipe(sourcemaps.init())
      .pipe(sass(sassConfig))
      .pipe(rename(function (file) {
          file.basename = file.dirname
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('assets'));
});

gulp.task('sass', gulp.parallel('sass:main', 'sass:components'));

gulp.task('watch', function () {
    gulp.watch(['src/scss/main/**/*.scss'], gulp.series('sass:main'));
    gulp.watch(['src/scss/components/**/*.scss'], gulp.series('sass:components'));
});


gulp.task('dev', gulp.series('sass', 'watch'));


