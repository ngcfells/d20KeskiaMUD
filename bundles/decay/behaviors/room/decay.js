'use strict';

const DecayEngine = require('../../lib/DecayEngine');

module.exports = srcPath => {
  const engine = new DecayEngine(srcPath);

  return {
    listeners: {
      updateTick: state => function () {
        // Rooms don't have traits, but they can still decay
        engine.process(this);
      }
    }
  };
};
