module.exports = {
  symlinkPrefix: 'bolt-',
  defaultPatternName: 'default',
  defaultPatternType: '00-bolt',
  defaultPatternSubtype: 'components',
  defaultTwigPath: 'src/twig',
  patternsFolder: '_patterns',
  packageFolders: [
    // `./node_modules/${npmNamespace}/${symlinkPrefix}*`,
    // `./packages/ui-*/bolt-`,
    './packages/elements-*',
    './packages/objects-*',
    './packages/settings-*',
    './packages/components-*',
    './packages/templates-*',
    './packages/pages-*'
  ],
  defaultPatternName: 'default'
};
