'use strict';

module.exports = {
  config: {
    name: 'Planar Resonance (Evil)',
    description: 'You resonate with malevolent planar forces.',
    type: 'buff',
  },

  state: {
    corruption: 1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('corruption') || 0;
    target.setMeta('corruption', current + effect.state.corruption);
  },

  remove: () => {}
};
