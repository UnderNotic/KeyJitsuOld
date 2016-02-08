const runSequence = require('run-sequence');
const gulp = require('gulp');
const del = require('del');
const watch = require('gulp-watch');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');

//watch copy only changed assets to dist and compile typescript
gulp.task('watch',['build'], function () {
    gulp.src(['src/**/*', '!src/**/*.ts'], { base: 'src' })
        .pipe(watch(['src/**/*', '!src/**/*.ts']))
        .pipe(gulp.dest('dist'));

    gulp.watch('src/app/**/*.ts', ['compile']);
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', function () {
    return gulp
        .src('src/app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest("dist/app"));
});

// copy libraries
gulp.task('copy:libs', function () {
    return gulp.src([
        './node_modules/es6-shim/es6-shim.js',
        './node_modules/systemjs/dist/system-polyfills.js',
        './node_modules/angular2/bundles/angular2-polyfills.js',
        './node_modules/angular2/bundles/router.dev.js',        
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/rxjs/bundles/Rx.js',
        './node_modules/angular2/bundles/angular2.dev.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(gulp.dest('./dist/libs'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
    return gulp.src(['src/**/*', '!src/**/*.ts'])
        .pipe(gulp.dest('dist'));
});

gulp.task('tslint', function () {
    return gulp.src('src/app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
}); 3

gulp.task('server', function () {
    require('lite-server');
});


gulp.task('build', function (callback) {
    runSequence('clean',
        ['tslint', 'compile', 'copy:libs', 'copy:assets'], callback);
});


gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('default', ['serve']);