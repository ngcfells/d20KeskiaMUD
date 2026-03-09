'use strict';

module.exports = {
  config: {
    name: 'Styx Memory Loss',
    description: 'The waters of the Styx erode memory and identity.',
    type: 'mental',
  },

  state: {
    willPenalty: -2,
  },

  apply: (effect, target) => {
    target.modifyAttribute('will', effect.state.willPenalty);
    target.setMeta('memory_corrupted', true);
  },

  remove: (effect, target) => {
    target.modifyAttribute('will', -effect.state.willPenalty);
    target.setMeta('memory_corrupted', false);
  }
};
