const fs = require('fs');

const contents = fs.readFileSync('yarn.lock', 'utf-8');

fs.writeFileSync(
  'yarn.lock',
  contents.replace(/http:\/\/localhost:4873/g, 'https://registry.yarnpkg.com'),
);
