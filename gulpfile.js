'use strict'

const { src, dest } = require('gulp')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssbeautify = require('gulp-cssbeautify')
const removeComments = require('gulp-strip-css-comments')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const panini = require('panini')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp', 'webp-converter')
const del = require('del')
const notify = require('gulp-notify')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const browserSync = require('browser-sync').create()

/* Paths */
const srcPath = 'src/'
const distPath = 'dist/'

const path = {
  build: {
    html: distPath,
    js: distPath + 'assets/js/',
    css: distPath + 'assets/css/',
    images: distPath + 'assets/images/',
    fonts: distPath + 'assets/fonts/',
  },
  src: {
    html: srcPath + 'pages/*.html',
    js: srcPath + 'assets/js/*.js',
    css: srcPath + 'assets/scss/*.scss',
    images:
      srcPath +
      'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  watch: {
    html: srcPath + '**/*.html',
    js: srcPath + 'assets/js/**/*.js',
    css: srcPath + 'assets/scss/**/*.scss',
    images:
      srcPath +
      'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  clean: './' + distPath,
}

/* Tasks */

function serve() {
  browserSync.init({
    server: {
      baseDir: './' + distPath,
    },
  })
}

function html(cb) {
  panini.refresh()
  return (
    src(path.src.html, { base: srcPath + 'pages/' })
      .pipe(plumber())
      .pipe(
        panini({
          root: srcPath + 'pages/',
          layouts: srcPath + 'layouts/',
          partials: srcPath + 'partials/',
          helpers: srcPath + 'helpers/',
          data: srcPath + 'data/',
        })
      )
      // .pipe(webpHTML())
      // .pipe(dataHTML({ ignore: true, tags: 'header' }))
      .pipe(dest(path.build.html))
      .pipe(browserSync.reload({ stream: true }))
  )

  cb()
}

function css(cb) {
  return (
    src(path.src.css, { base: srcPath + 'assets/scss/' })
      .pipe(
        plumber({
          errorHandler: function (err) {
            notify.onError({
              title: 'SCSS Error',
              message: 'Error: <%= error.message %>',
            })(err)
            this.emit('end')
          },
        })
      )
      .pipe(
        sass({
          includePaths: './node_modules/',
        })
      )
      .pipe(
        autoprefixer({
          cascade: true,
        })
      )
      .pipe(cssbeautify())
      // .pipe(webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' }))
      .pipe(dest(path.build.css))
      .pipe(
        cssnano({
          zindex: false,
          discardComments: {
            removeAll: true,
          },
        })
      )
      .pipe(removeComments())
      .pipe(
        rename({
          suffix: '.min',
          extname: '.css',
        })
      )
      .pipe(dest(path.build.css))
      .pipe(browserSync.reload({ stream: true }))
  )

  cb()
}

function cssWatch(cb) {
  return src(path.src.css, { base: srcPath + 'assets/scss/' })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err)
          this.emit('end')
        },
      })
    )
    .pipe(
      sass({
        includePaths: './node_modules/',
      })
    )
    .pipe(
      rename({
        suffix: '.min',
        extname: '.css',
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }))

  cb()
}

function js(cb) {
  return src(path.src.js, { base: srcPath + 'assets/js/' })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'JS Error',
            message: 'Error: <%= error.message %>',
          })(err)
          this.emit('end')
        },
      })
    )
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'app.js',
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }))

  cb()
}

function jsWatch(cb) {
  return src(path.src.js, { base: srcPath + 'assets/js/' })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'JS Error',
            message: 'Error: <%= error.message %>',
          })(err)
          this.emit('end')
        },
      })
    )
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'app.js',
        },
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }))

  cb()
}

function images(cb) {
  return src(path.src.images)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images))

    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }))

  cb()
}

function fonts(cb) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }))

  cb()
}

function includes(cb) {
  return gulp.src('src/includes/*').pipe(gulp.dest('dist'))

  cb()
}

function clean(cb) {
  return del(path.clean)

  cb()
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], cssWatch)
  gulp.watch([path.watch.js], jsWatch)
  gulp.watch([path.watch.images], images)
  gulp.watch([path.watch.fonts], fonts)
}

const build = gulp.series(
  clean,
  gulp.parallel(html, css, js, images, fonts, includes)
)
const watch = gulp.parallel(build, watchFiles, serve)

/* Exports Tasks */
exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.fonts = fonts
exports.includes = includes
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch
