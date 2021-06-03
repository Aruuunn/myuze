const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './dist/index.js',
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
  },
  optimization: {
    minimize: true,
  },
};
