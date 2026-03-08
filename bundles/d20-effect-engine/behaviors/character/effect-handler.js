'use strict';

module.exports = srcPath => {
  return {
    listeners: {
      updateTick: state => function () {
        state.EffectEngine.tick(this);
      }
    }
  };
};
