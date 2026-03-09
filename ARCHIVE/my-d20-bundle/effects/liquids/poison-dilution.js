'use strict';

module.exports = {
  config: {
    name: 'Poison Dilution',
    description: 'Weakens poisons already in your system.',
    type: 'utility',
  },

  state: {},

  apply: (effect, target) => {
    const effects = target.effects || [];
    for (const e of effects) {
      if (e.config && e.config.tags && e.config.tags.includes('poison')) {
        const newDuration = Math.floor(e.remaining / 2);
        e.setDuration(newDuration);
      }
    }
  },

  remove: () => {}
};
