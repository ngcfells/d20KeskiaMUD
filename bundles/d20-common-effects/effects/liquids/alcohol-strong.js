'use strict';

module.exports = {
  config: {
    name: 'Smashed',
    description: 'Barely able to stand.',
    type: 'debuff',
  },

  state: {
    strength: 1,
    dexterity: -3,
    will: -2,
  },

  apply: (effect, player) => {
    player.modifyAttribute('strength', effect.state.strength);
    player.modifyAttribute('dexterity', effect.state.dexterity);
    player.modifyAttribute('will', effect.state.will);
  },

  remove: (effect, player) => {
    player.modifyAttribute('strength', -effect.state.strength);
    player.modifyAttribute('dexterity', -effect.state.dexterity);
    player.modifyAttribute('will', -effect.state.will);
  }
};
