var gulp = require( 'gulp' );
var stylus = require( 'gulp-stylus' );
var postcss = require( 'gulp-postcss' );
var plumber = require( 'gulp-plumber' );
var autoprefixer = require( 'autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var imagemin = require( 'gulp-imagemin' );
var lost = require( 'lost' );
var connect = require( 'gulp-connect' );
var rucksack = require( 'gulp-rucksack' );

var paths = {
  stylesSource: './src/styles/',
  stylesDestination: './build/styles/',
  html: './',
  imagesSrc: './src/img/',
  imagesDest: './build/img'
};

gulp.task( 'connect', function () {
  connect.server( {
    root: paths.html,
    livereload: true
  } );
} );

gulp.task( 'rucksack', function () {
  return gulp.src( paths.stylesSource + '*.styl' )
      .pipe( stylus() )
      .pipe( rucksack() )
      .pipe( gulp.dest( paths.stylesDestination ) );
} );

// gulp.task( 'typography', function () {
//   var processors = [
//       atimport,
//     autoprefixer( {
//       browsers: [ 'last 3 versions' ]
//     } )
//   ];
//   return gulp.src( paths.stylesSource + '*.styl' )
//       .pipe( sourcemaps.init() )
//       .pipe( plumber() )
//       .pipe( postcss( processors ) )
//       .pipe( sourcemaps.write( './' ) )
//       .pipe( gulp.dest( paths.stylesDestination ) )
//       .pipe( connect.reload() );
//
// } );

gulp.task( 'images', function () {
  return gulp.src( paths.imagesSrc + '*' )
      .pipe( imagemin() )
      .pipe( gulp.dest( paths.imagesDest ) );
} );

gulp.task( 'styles', function () {
  var processors = [
    lost(),
    autoprefixer( {
      browsers: [ 'last 3 versions' ]
    } )
  ];
  return gulp.src( paths.stylesSource + '*.styl' )
      .pipe( sourcemaps.init() )
      .pipe( plumber() )
      .pipe( postcss( processors ) )
      .pipe( sourcemaps.write( './' ) )
      .pipe( gulp.dest( paths.stylesDestination ) )
      .pipe( connect.reload() );

} );

gulp.task( 'html', function () {
  gulp.src( './*.html' )
      .pipe( connect.reload() );
} );

gulp.task( 'watch', function () {
  gulp.watch( paths.stylesSource + '*.styl', [ 'styles' ] );
  gulp.watch( paths.imagesSrc + '*', [ 'images' ] );
  // gulp.watch( paths.stylesSource + 'grid.css', [ 'grid' ] );
  // gulp.watch( paths.stylesSource + '*.styl', [ 'typography' ] );
  gulp.watch( [ paths.html + '*.html' ], [ 'html' ] );
} );

gulp.task( 'default', [ 'connect', 'rucksack', 'images', 'watch' ] );