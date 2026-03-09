'use strict';

module.exports = {
  config: {
    name: 'Aberrant Mutation',
    description: 'You have been mutated into an aberration.',
    type: 'spell.transmutation',
    unique: true,
    persists: false,
  },
  state: {
    naturalArmorBonus: 0,
    originalType: 'humanoid'
  },
  modifiers: {
    attributes: {
      // Natural armor bonus provided by the spell
      naturalArmor: function (current) {
        return current + this.state.naturalArmorBonus;
      }
    }
  },
  listeners: {
    effectActivated: function () {
      this.target.setMeta('creatureType', 'aberration');
      this.target.addTag('is_aberration');
      // Logic for adding a tentacle attack can be hooked here in your combat engine
    },
    effectDeactivated: function () {
      this.target.setMeta('creatureType', this.state.originalType);
      this.target.removeTag('is_aberration');
    }
  }
};
