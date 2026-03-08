'use strict';

module.exports = {
  config: {
    name: 'Minor Chill',
    description: 'A chill slows your movements slightly.',
    type: 'debuff',
  },

  state: {
    dexPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('dexterity', effect.state.dexPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('dexterity', -effect.state.dexPenalty);
  }
};
