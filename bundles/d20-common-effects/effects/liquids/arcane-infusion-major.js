'use strict';

module.exports = {
  config: {
    name: 'Major Arcane Infusion',
    description: 'You are suffused with potent arcane power.',
    type: 'buff',
  },

  state: {
    spellcraftBonus: 2,
  },

  apply: (effect, target) => {
    const current = target.getMeta('arcane_focus') || 0;
    target.setMeta('arcane_focus', current + effect.state.spellcraftBonus);
  },

  remove: (effect, target) => {
    const current = target.getMeta('arcane_focus') || 0;
    target.setMeta('arcane_focus', current - effect.state.spellcraftBonus);
  }
};
