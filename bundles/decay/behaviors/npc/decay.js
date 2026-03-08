'use strict';

const DecayEngine = require('../../lib/DecayEngine');
const resolver = require('../../lib/resolvers/decayResolver');

module.exports = srcPath => {
  const engine = new DecayEngine(srcPath);

  return {
    listeners: {
      updateTick: state => function () {
        const mode = resolver.getDecayMode(this);
        if (!mode) return;

        engine.process(this);
      }
    }
  };
};
