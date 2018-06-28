var gulp = require('gulp'),
    env = require('node-env-file'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),

    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    prefixer = require('gulp-autoprefixer'),

    iconfontCss = require('gulp-iconfont-css'),
    iconfont = require('gulp-iconfont'),

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    ftp = require('vinyl-ftp'),
    gutil = require('gulp-util'),

    pacJson = require('./package.json'),
    nameProject = pacJson.demoServer,
    nameProject = pacJson.name;

try { env('.env') } catch (error) { console.error('WARNING. Create .env FILE') }

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: './dist'
        },
        notify: false,
        tunnel: false,
    })
})

gulp.task('jade', () => {
    gulp.src('src/jade/*.jade')
        .pipe(jade({ pretty: true, doctype: 'html' }))
        .on('error', function (error) {
            console.log(['', ("[" + error.name + " in " + error.plugin + "]"), error.message, ''].join('\n'));
            this.end();
        })
        .pipe(gulp.dest('dist'))
})

gulp.task('style', () => {
    gulp.src('src/styles/**/*.+(sass|scss|css)')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expand' }))
        .pipe(prefixer(['last 15 versions']))
        .pipe(cssnano({ zindex: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'))
})

gulp.task('js', () => {
    gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/scripts'))
})

gulp.task('icon', () => {
	var fontName = 'iconic'
	gulp.src('src/img/iconic/*.svg')
        .pipe(iconfontCss({
			fontName: fontName,
			path: 'src/styles/fonts/_iconfont-template.scss',
			targetPath: '../../src/styles/fonts/_iconfont.scss',
			fontPath: '../fonts/',
            cssClass: 'iconic'
        }))
		.pipe(iconfont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			startUnicode: true,
			prependUnicode: true,
			normalize: true,
			fontHeight: 1001,
            centerHorizontally: true,
        }))
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('img', () => {
	gulp.src('src/img/**/*')
	    .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
})

gulp.task('fonts', () => {
	gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('src/jade/**/*.jade', ['jade', browserSync.reload]);
    gulp.watch('src/styles/**/*.+(sass|scss|css)', ['style', browserSync.reload]);
    gulp.watch('src/js/**/*', ['js', browserSync.reload]);
    gulp.watch('src/img/iconic/**/*.svg', ['icon', browserSync.reload]);
    gulp.watch('src/img/**/*', ['img', browserSync.reload]);
    gulp.watch('src/fonts/**/*', ['fonts', browserSync.reload]);
});

gulp.task('default', ['watch'])

gulp.task('build', ['fonts', 'img', 'jade', 'style', 'js'])

gulp.task('deploy', () => {
    if (!process.env.FTP_HOST) console.error('ERROR. Add .env FTP_HOST')
    if (!process.env.FTP_USER) console.error('ERROR. Add .env FTP_USER')
    if (!process.env.FTP_PASSWORD) console.error('ERROR. Add .env FTP_PASSWORD')
    if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASSWORD) return false;

    var conn = ftp.create({ 
		host: process.env.FTP_HOST,
		user: process.env.FTP_USER,
		password: process.env.FTP_PASSWORD,
		parallel: 10,
        log: gutil.log()
    })

	gulp.src('dist/**/*', { buffer: false })
        .pipe(conn.dest('/' + demoServer + '/' + nameProject))
})

gulp.task('clearcache', () => { 
    cache.clearAll()
})

gulp.task('removedist', () => {
    del.sync('dist')
})