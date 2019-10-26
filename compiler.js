import { Babel, BabelCompiler } from 'meteor/babel-compiler';
import { transform } from '@babel/core';

export default class TypeScriptCompiler extends BabelCompiler {
  constructor(cacheDirectory) {
    super({});
    this.setDiskCacheDirectory(cacheDirectory);
  }

  inferExtraBabelOptions(inputFile, babelOptions, cacheDeps) {
    const result = super.inferExtraBabelOptions(inputFile, babelOptions, cacheDeps);
    if (!babelOptions.plugins) {
      babelOptions.plugins = [];
    }
    babelOptions.plugins.unshift(inputFile.require('@babel/plugin-transform-typescript'));
    return result;
  }
}
