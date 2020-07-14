const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
// const px2rem = require('px2rem');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm())
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

task('styles', () => {
  return src([...STYLE_LIBS, 'src/css/main.scss'])
    // .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    // .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    // .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    // .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('svg', () => {
  return src('src/img/**/*.svg')
    .pipe(dest(`${DIST_PATH}/img`));
});

task('png', () => {
  return src('src/img/**/*.png')
    .pipe(dest(`${DIST_PATH}/img`));
});

task('jpg', () => {
  return src('src/img/**/*.jpg')
    .pipe(dest(`${DIST_PATH}/img`));
});

task('fonts', () => {
  return src('src/fonts/*')
    .pipe(dest(`${DIST_PATH}/fonts`));
});

task('vid', () => {
  return src('src/video/*.mp4')
    .pipe(dest(`${DIST_PATH}/video`));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/css/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/img/**/*.svg', series('svg'));
  watch('./src/img/**/*.png', series('png'));
  watch('./src/img/**/*.jpg', series('jpg'));
});


task('default',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'svg', 'png', 'jpg', 'vid', 'fonts'),
    parallel('watch', 'server')
  )
);

task('build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'svg', 'png', 'jpg', 'vid', 'fonts'))
);