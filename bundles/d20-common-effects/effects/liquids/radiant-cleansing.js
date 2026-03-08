'use strict';

module.exports = {
  config: {
    name: 'Radiant Cleansing',
    description: 'Cleanses minor curses and shadow effects.',
    type: 'utility',
  },

  state: {},

  apply: (effect, target) => {
    const effects = target.effects || [];
    for (const e of effects) {
      if (e.config && e.config.tags && e.config.tags.includes('shadow')) {
        e.remove();
      }
    }
  },

  remove: () => {}
};
