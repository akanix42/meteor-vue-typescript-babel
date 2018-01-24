import { Meteor } from 'meteor/meteor';

global.vue = global.vue || {};
global.vue.lang = global.vue.lang || {};
global.vue.lang.typescript = Meteor.wrapAsync(typescriptHandler);
global.vue.lang.ts = global.vue.lang.typescript;

function typescriptHandler({ source, inputFile }, cb) {
  try {
    const result = Babel.compile(source);
    cb(null, {
      script: result.code,
      map: result.map,
      useBabel: false,
    });
  } catch (err) {
    cb(err);
  }
}
