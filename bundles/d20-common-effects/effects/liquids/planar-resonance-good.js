'use strict';

module.exports = {
  config: {
    name: 'Planar Resonance (Good)',
    description: 'You resonate with benevolent planar forces.',
    type: 'buff',
  },

  state: {
    willBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('will', effect.state.willBonus);
    const current = target.getMeta('good_resonance') || 0;
    target.setMeta('good_resonance', current + 1);
  },

  remove: (effect, target) => {
    target.modifyAttribute('will', -effect.state.willBonus);
  }
};
