# Change Log
All notable changes to this project will be documented in this file.
This project follows [Semantic Versioning](http://semver.org/).

## [1.0.3] - 2019-10-26
 - Fix compile error when there is no .babelrc file in the project

## [1.0.2] - 2019-08-21
 - Fix output for legacy bundle (IE 11)

## [1.0.1] - 2019-05-18
 - Compatible with Meteor 1.8+, no longer supports < Meteor 1.8
 - Update dependencies to latest versions

## [0.0.6] - 2018-09-06
 - Simplify compiler so that it only adds Babel TypeScript plugin; the rest of the processing is handled by Meteor's
   Babel compiler

## [0.0.4] - 2018-07-09
 - Update Babel sourcemap option for Babel 7
 - Update Babel dependencies

## [0.0.3] - 2018-01-26
 - Insert a separate compilation step to run before Meteor's babel-compiler. This is the TypeScript compilation occurs,
   because otherwise reify will throw errors when it tries to parse some TypeScript syntax such as the `as` keyword.
   If the user has @babel/preset-typescript in .babelrc it will no longer have any effect, because the TypeScript preset
   is now being invoked prior to the normal Babel compilation.

## [0.0.2] - 2018-01-24
 - Always use the `@babel/preset-typescript` even if it's not included in `.babelrc`

## [0.0.1] - 2018-01-23
 - Initial release
