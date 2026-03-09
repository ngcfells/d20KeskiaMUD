'use strict';

module.exports = {
  config: {
    name: 'Planar Resonance (Law)',
    description: 'Your thoughts align with order and structure.',
    type: 'buff',
  },

  state: {
    concentrationBonus: 1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('law_resonance') || 0;
    target.setMeta('law_resonance', current + 1);
  },

  remove: () => {}
};
