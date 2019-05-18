import { Meteor } from 'meteor/meteor';
import { Babel } from 'meteor/babel-compiler';
import TypeScriptCompiler from './compiler';

const fallbackCacheDirectory = '.meteor/local/plugin-cache/nathantreid_vue-typescript-babel';
const compiler = new TypeScriptCompiler(fallbackCacheDirectory);

global.vue = global.vue || {};
global.vue.lang = global.vue.lang || {};
global.vue.lang.typescript = Meteor.wrapAsync(typescriptHandler);
global.vue.lang.ts = global.vue.lang.typescript;

function typescriptHandler({ source, inputFile, cacheDirectory = null }, cb) {
  try {
    if (cacheDirectory) {
      compiler.setDiskCacheDirectory(cacheDirectory);
    }
    
    const result = compiler.processOneFileForTarget(inputFile, source);

    cb(null, {
      script: result.data,
      map: result.sourceMap,
      useBabel: false,
    });
  } catch (err) {
    cb(err);
  }
}
