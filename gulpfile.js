const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


//const with the connection order file css
const cssFiles = [
    './src/css/style.scss',
    './src/css/media.scss'
]
//const with the connection order file js
const jsFiles = [
    './src/js/main.js',
    './src/js/script.js'
]
//function styles css
function styles () {
    return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());

}

//function sctipts js
function scripts () {
    return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
}

function clean() {
    return del(['build/*'])
 }

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/*.css', styles)
    gulp.watch('./src/css/*.scss', styles)
    gulp.watch('./src/js/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('del', clean);

gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));

gulp.task('dev', gulp.series('build','watch'));

