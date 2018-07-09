import { Babel, BabelCompiler } from 'meteor/babel-compiler';
import { transform } from '@babel/core';

const defaultBabelOptions = {
  compact: false,
  ast: false,
  babelrc: false,
  sourceMaps: true,
  presets: ['@babel/preset-typescript'],
};

export default class TypeScriptCompiler extends BabelCompiler {
  constructor() {
    super({});
  }

  /**
   * Pass in the TypeScript compilation source map and enable source map output.
   **/
  inferExtraBabelOptions(inputFile, babelOptions, cacheDeps) {
    const result = super.inferExtraBabelOptions(inputFile, babelOptions, cacheDeps);
    babelOptions.inputSourceMap = inputFile.inputSourceMap;
    babelOptions.sourceMap = true;

    return result;
  }

  /**
   * The meteor-babel package used by babel-compiler runs reify first, which errors out on some TypeScript syntax:
   * For example, the `as` keyword causes an error:
   *      const a: string = 123 as any as string;
   * As a result, we must first use @babel/core to run the TypeScript transform before handing things off to the
   * babel-compiler package.
   **/
  processOneFileForTarget(inputFile, source) {
    /**
     * Reset the .babelrc cache because akryum:vue-component currently cannot notify us if we are on a new compilation
     * round. Perhaps there is some other way we could check?
     **/
    this._babelrcCache = Object.create(null);
    const tsBabelOptions = { ...defaultBabelOptions };
    const inputFilePath = inputFile.getPathInPackage();
    const packageName = inputFile.getPackageName();

    /**
     * TODO: These babel options were copied from the babel-compiler package. Are they necessary?
     **/
    tsBabelOptions.filename = tsBabelOptions.sourceFileName =
      packageName
        ? 'packages/' + packageName + '/' + inputFilePath
        : inputFilePath;

    /*  END TO DO */

    let result = this.compile(source, tsBabelOptions).await();
    /**
     * Set the source map on the input file so we can add it to the babel options later
     **/
    result.map.file = tsBabelOptions.filename + '.map';
    inputFile.inputSourceMap = result.map;
    result = super.processOneFileForTarget(inputFile, result.code);

    return result;
  }

  /**
   * Promisify Babel TypeScript compilation
   **/
  compile(source, babelOptions) {
    return new Promise((resolve, reject) => {
      transform(source, babelOptions, function (err, result) {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}
