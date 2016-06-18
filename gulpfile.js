const gulp      = require('gulp');
const $         = require('gulp-load-plugins')({ lazy: true });
const supertest = require('supertest');

gulp.task('serve', () => {
  $.nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules/**', 'gulpfile.js']
  })
  .on('restart', () => {
    log('Restarting');
  });
});

gulp.task('check-js-styles', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jscs.reporter('fail'))
    .pipe(gulp.dest('.'));
});

gulp.task('test', () => {
  $.env({ vars: { ENV: 'Test' } });

  return gulp.src('tests/*.js', { read: false })
    .pipe($.mocha({ reporter: 'nyan' }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});

gulp.task('default', ['check-js-styles', 'serve']);

function log(msg) {
  if (typeof (msg) === 'object') {
    for (const item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
