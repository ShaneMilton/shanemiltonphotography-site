var gulp = require('gulp');
var browserSync = require('browser-sync');
var cp = require('child_process');


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify('Building Jekyll');
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
	    server: {
		baseDir: '_site'
	    },
	    host: "localhost"
	});
});


gulp.task('watch', function() {
	// Watch .css files
	gulp.watch('css/**/*.css', ['jekyll-rebuild'])
	// Watch .js files
	//gulp.watch('src/js/**/*.js', ['js]);
	// Watch .html files and posts
	gulp.watch(['index.html', '_layouts/*.html', '_posts/*', 'about/*.html', 'blog/*.html', 'contact/*.html', 'paybill/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', ['jekyll-build'], function() {
	gulp.start('browser-sync', 'watch');
});
