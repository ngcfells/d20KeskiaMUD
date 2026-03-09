/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/dimensional_lock.js
 */
'use strict';

module.exports = {
  id: 'dimensional_lock',
  name: 'Dimensional Lock',
  level: 8,
  school: 'abjuration',
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'area',
  area: '20-ft. radius emanation',
  duration: '1 day/level',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say("A shimmering emerald barrier prevents all teleportation in the area.");
  }
};
