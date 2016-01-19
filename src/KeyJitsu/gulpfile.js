const gulp = require("gulp");
const del = require("del");
const typescript = require("gulp-typescript");
const tscConfig = require("./tsconfig.json");
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');

// clean the contents of the distribution directory
gulp.task("clean", function () {
    return del("./wwwroot/**/*");
});

// TypeScript compile
gulp.task("compile", ["clean"], function () {
    return gulp
      .src("app/**/*.ts")
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write("."))  
      .pipe(gulp.dest("wwwroot"));
});

// copy libraries
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
            './node_modules/es6-shim/es6-shim.js',
            './node_modules/systemjs/dist/system-polyfills.js',
            './node_modules/angular2/bundles/angular2-polyfills.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/rxjs/bundles/Rx.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js'
        ])
        .pipe(gulp.dest('wwwroot/libs'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
    return gulp.src(['App/**/*', '!App/**/*.ts'], { base: './App' })
        .pipe(gulp.dest('wwwroot'));
});

gulp.task('tslint', function () {
    return gulp.src('App/**/*.ts')
      .pipe(tslint())
      .pipe(tslint.report('verbose'));
});

gulp.task("build", ["tslint", "compile", "copy:libs", "copy:assets"]);
gulp.task("default", ["build"]);