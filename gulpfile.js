var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.es6.js')
                .pipe(sourcemaps.init())
                .pipe(plumber({
                    errorHandler: function(error) {
                        console.log(error.message);
                        this.emit('end');
                    }
                }))
                .pipe(babel({
                    presets: ['es2015'],
                    plugins: ['transform-object-rest-spread']
                }))
                .pipe(concat('script.js'))
                .pipe(gulp.dest('dist/js'))
                .pipe(rename('script.min.js'))
                .pipe(uglify())
                .pipe(sourcemaps.write('/'))
                .pipe(gulp.dest('dist/js'));
})

gulp.task('styles', function(){
    return gulp.src('src/**/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(concat('styles.css'))
                .pipe(gulp.dest('dist/css'))
                .pipe(rename('styles.min.css'))
                .pipe(minifyCss())
                .pipe(sourcemaps.write('/'))
                .pipe(gulp.dest('dist/css'));
});