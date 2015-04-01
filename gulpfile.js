var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var es6ify = require('es6ify');

var app = './app';

var browserify_instance = browserify({
   cache: {},
   packageCache: {},
   fullPaths: true,
   debug: true
 })
 .add(es6ify.runtime)
 .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
 .require(app + '/js/main.js', { entry: true });

 var bundler = watchify(browserify_instance);

gulp.task('browserify', function() {

 bundler.on('update', rebundle);

 bundler.on('log', function (msg) {
   console.log(msg);
 });

 function rebundle() {

   return bundler
   .bundle()
   // log errors if they happen
   .on('error', gutil.log.bind(gutil, 'Browserify Error'))
   .pipe(source('bundle.js'))
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest(app + '/'));
 }

 return rebundle();

});

// watch files for changes and reload
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: './',
        },
        open: true,
        startPath: '/app',
        injectChanges: true,
    });

  gulp.watch(['index.html', 'bundle.js', 'css/**/*.css'], {cwd: 'app'}).on('change', reload);

});


gulp.task('default', ['server', 'browserify'])
