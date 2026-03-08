'use strict';

const LifecycleEngine = require('../../lib/LifecycleEngine');
const TQ = require('../../lib/TraitQuery');

module.exports = srcPath => {
  const engine = new LifecycleEngine(srcPath);

  return {
    listeners: {
      updateTick: state => function () {

        // Items can influence lifecycle but do not have their own physiology.
        // We only process items that explicitly declare lifecycle behavior.
        // This allows items to modify NPC lifecycle when held, worn, or in room.

        // Example: magical items with time dilation, cursed hunger, regen boosts, etc.
        // The engine will look for item metadata that modifies lifecycle rates.

        engine.process(this);
      }
    }
  };
};
