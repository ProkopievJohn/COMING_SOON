var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssMin = require('gulp-cssmin'),
    csscomb = require('gulp-csscomb'),
    rename = require('gulp-rename'),
    wiredep = require('wiredep').stream,
    server = require('gulp-server-livereload'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jade = require('gulp-jade'),
    prettify = require('gulp-html-prettify'),
    stylus = require('gulp-stylus'),
    complexity = require('gulp-complexity'),
    autopolyfiller = require('gulp-autopolyfiller');

// CLEAN 
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// IMAGE-MIN
gulp.task('img', function () {
  gulp.src('app/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('app/img'))
});

// BUILD
gulp.task('build', ['clean'], function () {
  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssMin()))
    // .pipe(uncss({
    //         html: ['dist/*.html']
    //     }))
    .pipe(gulp.dest('dist'));
});

//BOWER
gulp.task('bower', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('app'));
});

// JADE
gulp.task('jade', function () {
  gulp.src('app/jade/index.jade')
    .pipe(jade())
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('app'))
});

// STYLUS
gulp.task('styl', function() {
  gulp.src('app/styl/*.styl')
    .pipe(stylus())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
    .pipe(concat('style.styl.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(csscomb())
    .pipe(cssMin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

// SCSS
gulp.task('sass', function () {
  gulp.src(['app/scss/*.scss'])
    .pipe(sass())
    .on('error', console.log)
    .pipe(prefix('last 4 versions', '> 1%', 'ie 9'))
    .pipe(concat('style.scss.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(csscomb())
    .pipe(cssMin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

// JAVASCRIPT
gulp.task('js', function () {
  gulp.src('app/myjs/*.js')
    .pipe(complexity())
    .pipe(autopolyfiller('result_polyfill_file.js', {
        browsers: ['last 4 version', '> 1%', 'ie 9']
    }))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

//SERVER
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      // directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/styl/*.styl', ['styl']);
  gulp.watch('bower.json', ['bower']);
  gulp.watch('app/jade/*.jade',['jade']);
  gulp.watch('app/myjs/*.js',['js']);
});

gulp.task('default', ['watch', 'jade', 'js', 'img', 'styl', 'sass', 'webserver']);