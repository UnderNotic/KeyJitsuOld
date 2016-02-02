const gulp = require("gulp");
const del = require("del");
const typescript = require("gulp-typescript");
const tscConfig = require("./tsconfig.json");
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');

// clean the contents of the distribution directory
gulp.task("clean", function () {
    return del("dist/**/*");
});

// TypeScript compile
gulp.task("compile", ["clean"], function () {
    return gulp
      .src("src/app/**/*.ts")
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(gulp.dest("dist/app"));
});

// copy libraries
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
            './node_modules/es6-shim/es6-shim.js',
            './node_modules/systemjs/dist/system-polyfills.js',
            './node_modules/angular2/bundles/angular2-polyfills.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/rxjs/bundles/Rx.js',
            './node_modules/angular2/bundles/angular2.dev.js'
    ])
        .pipe(gulp.dest('dist/libs'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
    return gulp.src(['src/**/*', '!src/**/*.ts'])
        .pipe(gulp.dest('dist'));
});

gulp.task('tslint', function () {
    return gulp.src('src/app/**/*.ts')
      .pipe(tslint())
      .pipe(tslint.report('verbose'));
});

gulp.task('serve', function(){
    require('lite-server');
})

gulp.task("build", ["tslint", "compile", "copy:libs", "copy:assets"]);
gulp.task("default", ["build"]);