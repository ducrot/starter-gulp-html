/********************************************************************
 * Misc utilities
 */

import {deleteAsync} from 'del'
import config from './config.js'
import notify from 'gulp-notify'

function onError(err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
    sound: 'Beep'
  })(err);

  this.emit('end');
}


async function clean() {
  const deleted = await deleteAsync(
    config.build.dest,
    {force: true, dryRun: false}
  );
  // console.log('Deleted files and folders:\n', deleted.join('\n'));
  return deleted;
}

export {clean, onError}
