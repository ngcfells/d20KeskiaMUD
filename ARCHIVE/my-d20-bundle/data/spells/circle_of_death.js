/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/circle_of_death.js
 */
'use strict';

module.exports = {
  id: 'circle_of_death',
  name: 'Circle of Death',
  level: 6,
  school: 'necromancy',
  descriptors: ['death'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  range: 'medium',
  target: 'area',
  area: '40-ft. radius burst',
  duration: 'instantaneous',
  savingThrow: 'fort',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say("A ripple of negative energy snuffes out the lives of the weak.");
    // Logic: Kills 1d4 HD/level worth of creatures.
  }
};
