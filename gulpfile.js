var gulp          = require('gulp'),
    fs            = require('fs'),
    plumber       = require('gulp-plumber'),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    jade          = require('gulp-jade'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    rename        = require('gulp-rename'),
    livereload    = require('gulp-livereload');


// Do we have a config file?
if (fs.existsSync('./config.json')) {
    var config = require('./config.json');
    var theme_folder = config.dillo_install + "/dillo/application/themes/" + config.theme_name;

    gulp.task('default', ['styles', 'templates', 'scripts']);

} else {

    gulp.task('default', function() {
        process.stdout.write('\n== Your config.json file is missing ==\n');
        process.stdout.write('* Read more at https://github.com/armadillica/dillo-theme-blueprint\n\n');
    });

    return
}


/* CSS */
gulp.task('styles', function() {
    gulp.src('src/styles/**/*.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'}
            ))
        .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(theme_folder + '/static/css'))
        .pipe(livereload());
});

/* Templates - Jade */
gulp.task('templates', function() {
    gulp.src('src/templates/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(theme_folder + '/templates'))
        .pipe(livereload());
});

/* Scripts */
gulp.task('scripts', function() {
    gulp.src('src/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(function(path){
            path.extname = '.min.js'
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(theme_folder + '/static/js'))
        .pipe(livereload());
});

/* Scripts Concatenated */
gulp.task('scripts-tutti', function() {
    gulp.src('src/scripts/uglify/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat("tutti.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(theme_folder + '/static/js'))
        .pipe(livereload());
});

// While developing, run 'gulp watch'
gulp.task('watch',function() {
    livereload.listen();

    gulp.watch('src/styles/**/*.sass',['styles']);
    gulp.watch('src/templates/**/*.jade',['templates']);
    gulp.watch('src/scripts/uglify/**/*.js',['scripts']);
});

// Run 'gulp' to build everything at once
gulp.task('default', ['styles', 'templates', 'scripts', 'scripts-tutti']);

