/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/control_water.js
 */
'use strict';

module.exports = {
  id: 'control_water',
  name: 'Control Water',
  level: 4,
  school: 'transmutation',
  descriptors: ['water'],
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  range: 'long',
  target: 'water area',
  duration: '10 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("The water level responds to your command, rising or falling at your whim.");
  }
};
