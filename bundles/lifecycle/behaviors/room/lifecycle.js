'use strict';

const LifecycleEngine = require('../../lib/LifecycleEngine');

module.exports = srcPath => {
  const engine = new LifecycleEngine(srcPath);

  return {
    listeners: {
      updateTick: state => function () {
        engine.process(this);
      }
    }
  };
};
