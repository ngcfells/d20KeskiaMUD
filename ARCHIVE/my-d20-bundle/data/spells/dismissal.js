/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/dismissal.js
 */
'use strict';

module.exports = {
  id: 'dismissal',
  name: 'Dismissal',
  level: 4, // Cleric 4, Sor/Wiz 5
  school: 'abjuration',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'close',
  target: 'one extraplanar creature',
  duration: 'instantaneous',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      caster.say(`You force ${target.name} back to its home plane.`);
      // target.banish();
    }
  }
};
