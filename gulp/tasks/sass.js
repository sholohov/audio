import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import cssvariables from 'postcss-css-variables';
import sortCSSmq from 'sort-css-media-queries';
import pxtorem from 'postcss-pxtorem';
import config from '../config';
import bs from 'browser-sync';


const processors = [
	autoprefixer({
		browsers: ['last 4 versions', 'IE 11'],
		cascade: false
	}),
	cssvariables({
		preserve: true
	}),
	pxtorem({
		// rootValue - default pixel size for rem
		rootValue: 16,
		propList: ['*'],
		mediaQuery: false,
		minPixelValue: 1
	}),
	mqpacker({
		sort: sortCSSmq.desktopFirst
	}),
	cssnano({
		minifyFontValues: false,
		discardUnused: false
	})
];

gulp.task('sass', () => {
	return gulp
		.src(`${config.src.sass}/*.{sass,scss}`)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
			precision: 5
		}))
		.on('error', config.errorHandler)
		.pipe(postcss(processors))
	// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dest.css));
	// .pipe(bs.stream());
});

gulp.task('sass:watch', () => {
	gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, ['sass']);
});

let isMax = (mq) => /max-width/.test(mq);
let isMin = (mq) => /min-width/.test(mq);

function sortMediaQueries(a, b) {
	const A = a.replace(/\D/g, '');
	const B = b.replace(/\D/g, '');

	if (isMax(a) && isMax(b)) {
		return B - A;
	} else if (isMin(a) && isMin(b)) {
		return A - B;
	} else if (isMax(a) && isMin(b)) {
		return 1;
	} else if (isMin(a) && isMax(b)) {
		return -1;
	}

	return 1;
}
