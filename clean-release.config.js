module.exports = {
  include: [
    'dist/**/*',
    'LICENSE',
    'package.json',
    'README.md'
  ],
  exclude: [
  ],
  base: 'dist',
  askVersion: true,
  postScript: [
    'npm publish "[dir]" --access public',
    'git add package.json',
    'git commit -m "feat: publish v[version]"',
    'git tag v[version]',
    'git push',
    'git push origin v[version]'
  ]
}
