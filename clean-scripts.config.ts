const tsFiles = `"src/**/*.ts" "spec/**/*.ts"`
const jsFiles = `"*.config.js"`

export default {
  build: [
    `rimraf dist/`,
    {
      back: [
        'tsc -p src/tsconfig.nodejs.json',
        'api-extractor run --local'
      ],
      front: [
        `tsc -p src/tsconfig.browser.json`,
        `rollup --config rollup.config.js`
      ]
    }
  ],
  lint: {
    ts: `eslint --ext .js,.ts,.tsx ${tsFiles} ${jsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src/tsconfig.nodejs.json --strict',
    typeCoverageBrowser: 'type-coverage -p src/tsconfig.browser.json --strict'
  },
  test: [
    'ava'
  ],
  fix: `eslint --ext .js,.ts,.tsx ${tsFiles} ${jsFiles} --fix`
}
