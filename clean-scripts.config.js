module.exports = {
  build: [
    `rimraf dist/`,
    {
      back: `tsc -p src/tsconfig.nodejs.json`,
      front: [
        `tsc -p src/tsconfig.browser.json`,
        `rollup --config rollup.config.js`
      ]
    }
  ],
  lint: {
    ts: `tslint "*.ts" "spec/*.ts"`,
    js: `standard "**/*.config.js"`
  },
  test: [
    'tsc -p spec',
    'jasmine'
  ],
  fix: {
    ts: `tslint --fix "*.ts" "spec/*.ts"`,
    js: `standard --fix "**/*.config.js"`
  },
  release: `clean-release`
}
