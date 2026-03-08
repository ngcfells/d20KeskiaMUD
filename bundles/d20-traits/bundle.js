// path: bundles/d20-traits/bundle.js
'use strict';

const loadTraits = require('./lib/loaders/trait-loader');

module.exports = {
  name: 'd20-traits',
  listeners: {},
  bundles: [],

  init(state) {
    loadTraits(state, __dirname);
  }
};
