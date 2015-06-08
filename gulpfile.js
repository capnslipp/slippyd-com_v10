var gulpHelpF = require('gulp-help');
var gulp = gulpHelpF(require('gulp'));
var sass = require('gulp-sass');



// Constants

const PATHS = (function createConstPATHS()
{
	var sassDir = './source/**/';
	var sassGlobs = [
		sassDir+'*.sass',
		sassDir+'*.scss'
	];
	
	var cssDir = './compiled/css/';
	var cssGlob = cssDir+'*';
	
	function Path(dirOrDirs, globOrGlobs) {
		if (Object.is(this, global))
			throw arguments.callee.name+"() is a constructor; it can only be called with `new`."
		
		this.dir = dirOrDirs;
		this.glob = globOrGlobs;
	}
	
	return {
		dev: {
			sass: new Path(sassDir, sassGlobs),
		},
		web: {
			css: new Path(cssDir, cssGlob),
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
