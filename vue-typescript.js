import { Meteor } from 'meteor/meteor';
import { Babel } from 'meteor/babel-compiler';
import TypeScriptCompiler from './compiler';

const compiler = new TypeScriptCompiler();

global.vue = global.vue || {};
global.vue.lang = global.vue.lang || {};
global.vue.lang.typescript = Meteor.wrapAsync(typescriptHandler);
global.vue.lang.ts = global.vue.lang.typescript;

function typescriptHandler({ source, inputFile }, cb) {
  try {
    const babelOptions = addTypescriptPresetToBabelOptions(inputFile);
    const result = Babel.compile(source, babelOptions);

    cb(null, {
      script: result.code,
      map: result.map,
      useBabel: false,
    });
  } catch (err) {
    cb(err);
  }
}

function addTypescriptPresetToBabelOptions(inputFile) {
  const babelOptions = Babel.getDefaultOptions();
  compiler.inferExtraBabelOptions(inputFile, babelOptions);
  babelOptions.sourceMap = true;

  return babelOptions;
}
