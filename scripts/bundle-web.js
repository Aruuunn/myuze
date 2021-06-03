const { renameSync } = require('fs');
const { execSync } = require('child_process');

execSync('yarn exec lerna run bundle --scope=@open-music-player/api');

renameSync('packages/api/bundle', 'dist');

renameSync('packages/web/build', 'dist/public');


