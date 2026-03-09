'use strict';

module.exports = {
  config: {
    name: 'Drunk',
    description: 'You feel bold but clumsy.',
    type: 'debuff',
  },

  state: {
    morale: 2,
    dexterity: -2,
  },

  apply: (effect, player) => {
    player.modifyAttribute('charisma', effect.state.morale);
    player.modifyAttribute('dexterity', effect.state.dexterity);
  },

  remove: (effect, player) => {
    player.modifyAttribute('charisma', -effect.state.morale);
    player.modifyAttribute('dexterity', -effect.state.dexterity);
  }
};
