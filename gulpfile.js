const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const px2rem = require('gulp-smile-px2rem');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, DEV_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');


sass.compiler = require('node-sass');

task('clean-dev', () => {
  return src(`${DEV_PATH}/**/*`, { read: false })
    .pipe(rm())
})

task('clean-prod', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm())
})

task('copy:html-dev', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DEV_PATH))
    .pipe(reload({ stream: true }));
})

task('copy:html-prod', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})


task('styles-dev', () => {
  return src([...STYLE_LIBS, 'src/css/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(DEV_PATH))
    .pipe(reload({ stream: true }));
});

task('styles-prod', () => {
  return src([...STYLE_LIBS, 'src/css/main.scss'])
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem({
      dpr: 1,            
      rem: 18,
      one: false 
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'], 
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});


task('scripts-dev', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(sourcemaps.write())
    .pipe(dest(DEV_PATH))
    .pipe(reload({ stream: true }));
});

task('scripts-prod', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('svg-dev', () => {
  return src('src/img/**/*.svg')
    .pipe(dest(`${DEV_PATH}/img`));
});

task('svg-prod', () => {
  return src('src/img/**/*.svg')
    .pipe(dest(`${DIST_PATH}/img`));
});

task('png-dev', () => {
  return src('src/img/**/*.png')
    .pipe(dest(`${DEV_PATH}/img`));
});

task('png-prod', () => {
  return src('src/img/**/*.png')
    .pipe(dest(`${DIST_PATH}/img`));
});

task('jpg-dev', () => {
  return src('src/img/**/*.jpg')
    .pipe(dest(`${DEV_PATH}/img`));
});

task('jpg-prod', () => {
  return src('src/img/**/*.jpg')
    .pipe(dest(`${DIST_PATH}/img`));
});

task('fonts-dev', () => {
  return src('src/fonts/*')
    .pipe(dest(`${DEV_PATH}/fonts`));
});

task('fonts-prod', () => {
  return src('src/fonts/*')
    .pipe(dest(`${DIST_PATH}/fonts`));
});

task('vid-dev', () => {
  return src('src/video/*.mp4')
    .pipe(dest(`${DEV_PATH}/video`));
});

task('vid-prod', () => {
  return src('src/video/*.mp4')
    .pipe(dest(`${DIST_PATH}/video`));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dev"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/css/**/*.scss', series('styles-dev'));
  watch('./src/*.html', series('copy:html-dev'));
  watch('./src/scripts/*.js', series('scripts-dev'));
  watch('./src/img/**/*.svg', series('svg-dev'));
  watch('./src/img/**/*.png', series('png-dev'));
  watch('./src/img/**/*.jpg', series('jpg-dev'));
});


task('default',
  series(
    'clean-dev',
    parallel('copy:html-dev', 'styles-dev', 'scripts-dev', 'svg-dev', 'png-dev', 'jpg-dev', 
    'vid-dev', 'fonts-dev'),
    parallel('watch', 'server')
  )
);

task('build',
  series(
    'clean-prod',
    parallel('copy:html-prod', 'styles-prod', 'scripts-prod', 'svg-prod', 'png-prod', 
    'jpg-prod', 'vid-prod', 'fonts-prod'))
);