'use strict';

module.exports = {
  config: {
    name: 'Ability Rip Graft',
    description: 'You are sustaining a stolen supernatural ability.',
    type: 'spell.transmutation',
    unique: false,
    persists: true,
  },
  state: {
    stolenAbility: null,
    abilityConfig: null,
    donorUuid: null,
    recipientUuid: null
  }
};
