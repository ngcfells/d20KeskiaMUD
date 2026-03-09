// path: bundles/my-d20-bundle/effects/absorption_active.js
'use strict';

module.exports = {
  config: {
    name: 'Absorption Field',
    description: 'You are surrounded by a field that consumes incoming spells.',
    type: 'spell.abjuration',
    unique: true,
    persists: false, // 9th level spells are usually too volatile for logout persistence
  },
  state: {
    remainingCapacity: 0,
    storedLevels: 0
  },
  listeners: {
    effectActivated: function () {
      this.target.addTag('spell_absorption_active');
    },
    effectDeactivated: function () {
      this.target.removeTag('spell_absorption_active');
    }
  }
};
