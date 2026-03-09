/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/daylight.js
 */
'use strict';

module.exports = {
  id: 'daylight',
  name: 'Daylight',
  level: 3,
  school: 'evocation',
  descriptors: ['light'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'object touched',
  area: '60-ft. radius',
  duration: '10 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say(`A brilliant, sun-like radiance erupts from ${target.name}.`);
  }
};
