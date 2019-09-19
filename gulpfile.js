var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', async function(){
	gulp.src('./scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function(){
	gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
	browserSync.init(["./css/*.css", "./src/templates/**/*.html.twig"], {
		proxy: "http://drupalpractic.docker.localhost:8000/",
	})
});

gulp.task('watch', gulp.series('sass', gulp.parallel('browser-sync', 'sass:watch')));

gulp.task('default', gulp.series('watch'));
