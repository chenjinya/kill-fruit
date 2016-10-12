const gulp 	= require('gulp');
const babel = require('gulp-babel');
const useref = require('gulp-useref');
// var uglify 	= require('gulp-uglify');
// var jshint 	= require('gulp-jshint');
// var concat 	= require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const gulpSequence = require('gulp-sequence');
//const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

const imagemin = require('gulp-imagemin');
 

const path = require('path');
 
// gulp.task('less', function () {
//   return gulp.src('src/**/*.less', {base: 'src' } )
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(less())
//     .pipe(sourcemaps.write())
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//     }))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('sass', function () {
  return gulp.src('src/**/*.scss', {base: 'src' } )
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['>1%'],
        cascade: true
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('js', () => {
    return gulp.src('src/**/*.es5', {base: 'src' } )
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html', {base: 'src' } )
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(useref())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('image', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('sass:watch', function () {
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', (cb) => {
    gulpSequence(
        ['sass:watch']
        )(cb);
});