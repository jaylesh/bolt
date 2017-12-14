module.exports = {
  configFile: 'pattern-lab/config/config.yml',
  manifestFile: 'bolt-manifest.yml',
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md'
  ],
  extraWatches: [
    '!**/package.json',
    '!**/dist/**/*',
    './bolt-website/bolt-manifest.json',
    './packages/components/**/*.twig',
    // 'packages/bolt-toolkit-*/**/*.twig'
  ],
  patternLab: {
    enabled: true,
    configFile: 'apps/pattern-lab--workshop/config/config.yml',
    twigNamespaces: {
      addToDrupalThemeFile: true,
      sets: [],
      // disabling for now
      Xsets: [
        {
          namespace: 'bolt',
          paths: [
            'src/_patterns'
          ]
        }
      ]
    },
  },
  browserSync: {
    enabled: true,
    serverName: 'bolt-server'
  }
};
