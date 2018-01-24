Package.describe({
  name: 'nathantreid:vue-typescript-babel',
  version: '0.0.1',
  summary: 'Add typescript support for vue components',
  git: 'https://github.com/nathantreid/meteor-vue-typescript-babel',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "vue-component-typescript-babel",
  use: [
    'ecmascript@0.10.0',
    'babel-compiler@7.0.0',
  ],
  sources: [
    'vue-typescript.js',
  ],
});

Package.onUse(function(api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('akryum:npm-check@0.0.4');
});