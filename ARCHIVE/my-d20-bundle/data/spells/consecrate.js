/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/consecrate.js
 */
'use strict';

module.exports = {
  id: 'consecrate',
  name: 'Consecrate',
  level: 2,
  school: 'evocation',
  descriptors: ['good'],
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  range: 'close',
  target: 'area',
  area: '20-ft. radius emanation',
  duration: '2 hours/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("The area is filled with positive energy, weakening undead.");
    // Logic: -1 to undead attack/damage/saves; +3 DC to resist turning.
  }
};
