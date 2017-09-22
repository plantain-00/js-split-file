import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'dist/browser.js',
  name: 'SplitFile',
  plugins: [resolve(), uglify()],
  output: {
    file: 'dist/js-split-file.min.js',
    format: 'umd'
  }
}
