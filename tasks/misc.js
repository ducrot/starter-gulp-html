/********************************************************************
 * Misc utilities
 */

import del from 'del'
import config from './config'
import notify from 'gulp-notify'


function onError (err) {
    notify.onError({
        title   : 'Gulp',
        subtitle: 'Failure!',
        message : 'Error: <%= error.message %>',
        sound   : 'Beep'
    })(err);

    this.emit('end');
}


function clean() {
    return del(
        config.build.dest,
        { force: true }
    );
}

export { clean, onError }