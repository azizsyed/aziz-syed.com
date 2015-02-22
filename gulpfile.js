var gulp = require('gulp');
var sftp = require('gulp-sftp');



gulp.task('default', function() {
  // place code for your default task here
});


gulp.task('ftp', function () {
  return gulp.src('_site/*')
    .pipe(sftp({
      host: 'ftp.azizsyed.com',
      auth: 'keyMain',
      port: 21
    }));
});