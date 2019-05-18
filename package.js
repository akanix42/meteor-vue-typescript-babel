Package.describe({
  name: 'nathantreid:vue-typescript-babel',
  version: '1.0.1',
  summary: 'Add typescript support for vue components',
  git: 'https://github.com/nathantreid/meteor-vue-typescript-babel',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "vue-component-typescript-babel",
  use: [
    'ecmascript@0.12.4',
    'babel-compiler@7.3.4',
  ],
  sources: [
    'compiler.js',
    'vue-typescript.js',
  ],
});

Package.onUse(function(api) {
  api.versionsFrom('1.8');
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('akryum:npm-check@0.1.2');
});
