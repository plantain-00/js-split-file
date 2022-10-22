const { uglify } = require('rollup-plugin-uglify')
const resolve = require('@rollup/plugin-node-resolve')

module.exports = {
  input: 'dist/browser.js',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    name: 'SplitFile',
    file: 'dist/js-split-file.min.js',
    format: 'umd'
  }
}
