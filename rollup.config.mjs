import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'dist/browser.js',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    name: 'SplitFile',
    file: 'dist/js-split-file.min.js',
    format: 'umd'
  }
}
