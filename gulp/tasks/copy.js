import gulp from 'gulp';
import config from '../config.js';

gulp.task('copy:data', function() {
	return gulp
		.src(config.src.data + '/**/**.*')
		.pipe(gulp.dest(config.dest.data));
});

gulp.task('copy:fonts', function() {
	return gulp
		.src(config.src.fonts + '/*.{ttf,eot,woff,woff2,otf}')
		.pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:sounds', function() {
	return gulp
		.src(`${config.src.sounds}/**/*.*`)
		.pipe(gulp.dest(config.dest.sounds));
});

gulp.task('copy:lib', () => gulp
	.src(`${config.src.lib}/**/*.*`)
	.pipe(gulp.dest(config.dest.lib))
);

gulp.task('copy:rootfiles', () => gulp
	.src(`${config.src.root}/*.*`)
	.pipe(gulp.dest(config.dest.root))
);

gulp.task('copy:img', () => gulp
	.src([
		// `${config.src.img}/**/*.{cur,jpg,jpeg,png,jpeg,svg,gif,mp4,webm}`,
		`${config.src.img}/**/*.*`,
		`!${config.src.img}/svgo/**/*.*`
	])
	.pipe(gulp.dest(config.dest.img)));

gulp.task('copy', [
	'copy:img',
	'copy:data',
	'copy:sounds',
	// 'copy:rootfiles',
	// 'copy:lib',
	'copy:fonts'
]);

gulp.task('copy:watch', () => {
	gulp.watch(`${config.src.img}/*`, ['copy:img']);
	gulp.watch(`${config.src.data}/*`, ['copy:data']);
	gulp.watch(`${config.src.fonts}/*`, ['copy:fonts']);
	gulp.watch(`${config.src.sounds}/*`, ['copy:sounds']);
});
