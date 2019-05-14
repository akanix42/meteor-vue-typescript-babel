import { Babel, BabelCompiler } from 'meteor/babel-compiler';
import { transform } from '@babel/core';

export default class TypeScriptCompiler extends BabelCompiler {
  constructor() {
    super({});
  }

  inferExtraBabelOptions(inputFile, babelOptions, cacheDeps) {
    const result = super.inferExtraBabelOptions(inputFile, babelOptions, cacheDeps);
    babelOptions.plugins.unshift(inputFile.require('@babel/plugin-transform-typescript'));
    return result;
  }
}
