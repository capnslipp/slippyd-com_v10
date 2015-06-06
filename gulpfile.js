var gulp = require('gulp');
var sass = require('gulp-sass');



// Constants

const PATHS = (function createConstPATHS()
{
	var sass_dir = './source/**/';
	var sass_globs = [
		sass_dir+'*.sass',
		sass_dir+'*.scss'
	];
	
	var css_dir = './compiled/css/';
	var css_glob = css_dir+'*';
	
	function Path(dir_or_dirs, glob_or_globs) {
		if (Object.is(this, global))
			throw arguments.callee.name+"() is a constructor; it can only be called with `new`."
		
		this.dir = dir_or_dirs;
		this.glob = glob_or_globs;
	}
	
	return {
		dev: {
			sass: new Path(sass_dir, sass_globs),
		},
		web: {
			css: new Path(css_dir, css_glob),
		},
	};
})();



// Tasks

gulp.task('sass', function () {
	gulp.src(PATHS.dev.sass.glob).pipe(
		sass().on('error', sass.logError)
	).pipe(
		gulp.dest(PATHS.web.css.dir)
	);
});

gulp.task('sass:watch', function () {
	gulp.watch(PATHS.dev.sass.glob, ['sass']);
});
