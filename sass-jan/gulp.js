
// gulpfile.js ////////////////////
const gulp = require('gulp');

gulp.task('default', function() {
   return gulp.src('src/**/*')
    .pipe(gulp.dest('tmp'));
});

gulp.task('default', function() {
   return gulp.src('src/**/*.css')
    .pipe(gulp.dest('tmp'));
});

gulp.task('default', function() {
    return gulp.src('src/**/*.html')
     .pipe(gulp.dest('tmp'));
});

gulp.task('default', function() {
   return gulp.src(['src/**/*.js', 'src/**/*.css'])
    .on('data', function(file) {
       console.log(file);
   })
    .pipe(gulp.dest('tmp'));
});


// dest function:
gulp.task('default', function() {
   return gulp.src(['src/**/*.css', 'src/**/*.js'])
    .pipe(gulp.dest(function(file) {
       return 'dest';
   }));
});

gulp.task('default', function() {
   return gulp.src(['src/**/*.css', 'src/**/*.js'], [read: false])
      .pipe(gulp.dest('tmp'));
});

// src/less/  index.less
body {
    font-size: 20px;
    
   & .app {
      background-color: red; 
   }
}

.footer {
    display: flex;
    flex-direction: column;
    
    & .test {
        font-size: 100px;
    }
}


// src/js/ index.js /////////////////////////////////////



// src/js/ class.js ///////////////////////////////////


// src/css/ index.css /////////////////////////////////


// src/      index.html ///////////////////////////////


// in the console:
gulp
// and then we install less:
npm install --save-dev gulp-less
npm install --save-dev gulp-concat
npm install --save-dev gulp-sourcemaps
npm install --save-dev gulp-autoprefixer
npm install --save-dev gulp-clean-css
npm install --save-dev gulp-if
npm install --save-dev gulp-debug
npm install --save-dev browser-sync


// less example:
const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const browserSync = require('browser-sync');

const isDevelopment = true;

gulp.task('less', function() {
    return gulp.src('src/**/*.less')
     .pipe(debug(title: 'src'))
     .pipe(gulpIf(isDevelopment, sourcemaps.init()))
     .pipe(debug(title: 'sourcemaps'))
     .pipe(autoprefixer())
     .pipe(debug(title: 'autoprefixer'))
     .pipe(less())
     .pipe(debug('title: less'))
     .pipe(concat('bundle.css'))
     .pipe(debug(title: 'concat'))
     .pipe(cleanCss())
     .pipe(debug(title: 'clean-css'))
     .pipe(gulpIf(isDevelopment, sourcemaps.write()))
     .pipe(debug(title: 'sourcemaps-> write'))
     .pipe(gulp.dest('public'));
});

// rebuild index.html:
gulp.task('html', function() {
   return gulp.src('src/*.html')
    .pipe(gulp.dest('public'));
});

// default gulp task:
gulp.task('default', ['less', 'html']);

// watcher:
gulp.task('watch', function() {
   gulp.watch('src/**/*.sass', ['sass']);
});

gulp.task('browserSync', function() {
   browserSync({
       server: {
           baseDir: 'app'
       },
       notify: false
   });
});

// index.html //////////////////////////
<link rel="stylesheet" href="bundle.css">
    
npm install --save-dev gulp-clean-css
npm install --save-dev gulp-if
npm install --save-dev gulp-debug
    
 // repeat gulp plugins:
const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const sass = require('gulp-sass');

isDev = true;

gulp.task('less', function() {
   return gulp.src('src/less/**/*.less')
     .pipe(debug(title: 'src'))
     .pipe(gulpIf(isDev, sourcemaps.init()))
     .pipe(debug(title: 'sourcemaps.init'))
     .pipe(autoprefixer())
     .pipe(debug(title: 'autoprefixer'))
     .pipe(less())
     .pipe(debug(title: 'less'))
     .pipe(concat('bundle.css'))
     .pipe(debug(title: 'concat'))
     .pipe(clearCss())
     .pipe(debug(title: 'clearCss'))
     .pipe(gulpIf(isDev, sourcemaps.write()))
     .pipe(debug(title: 'sourcemaps.write'))
     .pipe(gulp.dest('public'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
      .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.sass', ['sass']);
});
 
gulp.task('default', ['less', 'html']);
