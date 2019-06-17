const path = require('path')

module.exports = {
  entry: './lib/server/cssServerMain',
  target: 'node',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, '.release/lib/server'),
    filename: 'cssServerMain.js'
  },
  plugins: [
  ],
  node: {
    __filename: false,
    __dirname: false
  }
}
