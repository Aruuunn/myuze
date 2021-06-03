const { renameSync, mkdirSync } = require('fs');
const { execSync } = require('child_process');

mkdirSync('dist');

renameSync('packages/web/build', 'packages/api/dist/public');

execSync('yarn exec lerna run bundle --scope=@open-music-player/api');

renameSync('packages/api/dist/@open-music-player/api', 'dist/main');
