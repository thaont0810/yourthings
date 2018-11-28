var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var gulpIf = require('gulp-if');
// var cssnano = require('gulp-cssnano');
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');
// var del = require('del');
// var runSequence = require('run-sequence');


gulp.task('hello', function() {
  console.log('Hello Zell');
});


gulp.task('sass', function(){
  return gulp.src('root/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('root/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("js", function () {
  return gulp.src("root/babel/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("root/js"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// watch
gulp.task('watch', ['browserSync', 'sass', 'js'], function(){
  gulp.watch('root/scss/**/*.scss', ['sass']); 
  gulp.watch('root/babel/**/*.js', ['js']);
  gulp.watch('root/*.html', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'root'
    },
  })
});

gulp.task('default', ['watch']);



// optimizing css and js
// gulp.task('useref', function(){
//   return gulp.src('root/*.html')
//     .pipe(useref())
//     .pipe(gulpIf('*.js', uglify()))
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'))
// });

// optimizing images
// gulp.task('images', function(){
//   return gulp.src('root/images/**/*.+(png|jpg|gif|svg)')
//   .pipe(cache(imagemin({
//     interlaced: true
//   })))
//   .pipe(gulp.dest('dist/images'))
// });

// copying fonts
// gulp.task('fonts', function() {
//   return gulp.src('root/fonts/**/*')
//   .pipe(gulp.dest('dist/fonts'))
// });


// cleaning
// gulp.task('clean:dist', function() {
//   return del.sync('dist');
// })

// gulp.task('cache:clear', function (callback) {
//   return cache.clearAll(callback)
// })

// build sequences

// gulp.task('default', function (callback) {
//   runSequence(['sass','browserSync', 'watch'],
//     callback
//   )
// })

// gulp.task('build', function (callback) {
//   runSequence('clean:dist', 
//     ['sass', 'useref'],
//     callback
//   )
// })
