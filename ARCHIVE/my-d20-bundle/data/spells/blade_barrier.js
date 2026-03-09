/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/blade_barrier.js
 * PURPOSE: SRD - Defensive/Offensive wall of whirling blades.
 */

'use strict';

module.exports = {
  id: 'blade_barrier',
  name: 'Blade Barrier',
  level: 6,
  school: 'evocation',
  subschool: null,
  descriptors: ['force'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'area',
  area: 'wall up to 20 ft. long/level',
  duration: '1 min./level',
  savingThrow: 'ref',
  spellResistance: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("A wall of shimmering, vertical blades leaps into existence.");
    // Logic: 1d6 damage/level (max 15d6) to anything passing through.
  }
};
