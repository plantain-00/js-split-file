import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'dist/browser.js',
  dest: 'dist/js-split-file.min.js',
  format: 'umd',
  moduleName: 'SplitFile',
  plugins: [resolve(), uglify()]
}
