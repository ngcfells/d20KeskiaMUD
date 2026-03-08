'use strict';

module.exports = {
  config: {
    name: 'Tipsy',
    description: 'A light buzz improves morale but dulls reflexes.',
    type: 'debuff',
  },

  state: {
    morale: 1,
    reflex: -1,
  },

  apply: (effect, player) => {
    player.modifyAttribute('charisma', effect.state.morale);
    player.modifyAttribute('reflex', effect.state.reflex);
  },

  remove: (effect, player) => {
    player.modifyAttribute('charisma', -effect.state.morale);
    player.modifyAttribute('reflex', -effect.state.reflex);
  }
};
