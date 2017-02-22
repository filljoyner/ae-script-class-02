const gulp = require('gulp');
const replace = require('gulp-replace');
const include = require('gulp-include');

gulp.task("build", ["rewriteIncludes"], function() {
    return gulp.src(".temp/lower_third_script.jsx")
        .pipe(include({ hardFail: true }))
            .on('error', console.log)
        .pipe(gulp.dest("dist"));
});

gulp.task("rewriteIncludes", function() {
    gulp.src("src/**/*.jsx")
        .pipe(replace("#include", "//=include"))
        .pipe(gulp.dest(".temp"));
});
