var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		zip            = require("gulp-zip"),
		sourceMap	   = require("gulp-sourcemaps"),
		spritesmith    = require('gulp.spritesmith');


// Скрипты проекта


//sprites build

gulp.task('sprite', function() {
	var spriteData =
		gulp.src('./app/img/icons/sprite/*.*') // путь, откуда берем картинки для спрайта
			.pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.css',
				padding: 20
			}));

	spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('./app/sass/')); // путь, куда сохраняем стили
});


gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js'
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/owl-carousel/owl-carousel/owl.carousel.min.js',
		'app/libs/slick/slick/slick.min.js',
		'app/libs/waterwheelcarousel/jQuery-Waterwheel-Carousel/js/jquery.waterwheelCarousel.min.js',
		'app/js/common.min.js' // Всегда в конце
		])
	.pipe( sourceMap.init() )
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(sourceMap.write())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "project", //страница доступа по адресу: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/main.sass')
	.pipe( sourceMap.init() )
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(sourceMap.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));
});

gulp.task('deploy', ['removezip'], function() {
	var zipFiles = gulp.src('dist/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'));	

	var conn = ftp.create({
		host:      'iocode.tk',
		user:      'admin_iocode',
		password:  'leto18121992',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/*.zip',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/public_html/'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });
gulp.task('removezip',  function() { return del.sync('dist/*.zip'); })
gulp.task('default', ['watch']);
