var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),// 压缩css
    uglify = require('gulp-uglify'),// 压缩js
    miniHtml=require("gulp-minify-html");
// gulp.task("copy", function () {
//     return gulp.src("css/*").pipe(gulp.dest("csss"));
// });


// 压缩css
gulp.task("minifycss", function () {
    return gulp.src("gg-css/*").pipe(minifycss()).pipe(gulp.dest("css"));
})
// 压缩js
gulp.task("uglify", function () {
    return gulp.src("gg-js/*").pipe(uglify()).pipe(gulp.dest("js"));
})
 
gulp.task('minifyhtml', function () {
    gulp.src('./*.html') // 要压缩的html文件
    .pipe(miniHtml()) //压缩
    .pipe(gulp.dest('html'));
});