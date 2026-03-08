'use strict';

module.exports = {
  config: {
    name: 'Hydration Overload',
    description: 'Too much water leaves you sluggish.',
    type: 'debuff',
  },

  state: {
    dexPenalty: -1,
    fortPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('dexterity', effect.state.dexPenalty);
    target.modifyAttribute('fortitude', effect.state.fortPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('dexterity', -effect.state.dexPenalty);
    target.modifyAttribute('fortitude', -effect.state.fortPenalty);
  }
};
