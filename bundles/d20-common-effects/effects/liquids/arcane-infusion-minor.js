'use strict';

module.exports = {
  config: {
    name: 'Minor Arcane Infusion',
    description: 'Arcane energy sharpens your spellcasting.',
    type: 'buff',
  },

  state: {
    spellcraftBonus: 1,
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
