var gulp=require('gulp');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');

gulp.task('concat',function(){
	return gulp.src(['./src/Itcast.core.js',
					'./src/Itcast.dom.js',
					'./src/Itcast.event.js',
					'./src/Itcast.style.js',
					'./src/Itcast.attr.js'])
	.pipe(concat('itcast.js'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('uglify',['concat'],function(){
	return gulp.src('./dist/*')
	.pipe(uglify())
	.pipe(gulp.dest('./mini'));
})