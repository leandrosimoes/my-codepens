let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let minifyCss = require('gulp-minify-css');
let babel = require('gulp-babel');
let plumber = require('gulp-plumber');

gulp.task('scripts', () => {
    return gulp.src('src/js/**/*.es6.js')
                .pipe(sourcemaps.init())
                .pipe(plumber({
                    errorHandler: error => {
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
                .pipe(gulp.dest('dist/js'))
                .pipe(gulp.dest('docs/assets/js'));
})

gulp.task('styles', () => {
    return gulp.src('src/**/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(concat('styles.css'))
                .pipe(gulp.dest('dist/css'))
                .pipe(rename('styles.min.css'))
                .pipe(minifyCss())
                .pipe(sourcemaps.write('/'))
                .pipe(gulp.dest('dist/css'))
                .pipe(gulp.dest('docs/assets/css'));
});

gulp.task('watch', () => {
    let watcher = gulp.watch('src/**/*.scss', ['styles']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})