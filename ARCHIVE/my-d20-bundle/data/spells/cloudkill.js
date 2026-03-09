/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cloudkill.js
 */
'use strict';

module.exports = {
  id: 'cloudkill',
  name: 'Cloudkill',
  level: 5,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'area',
  area: '20-ft. radius cloud',
  duration: '1 min./level',
  savingThrow: 'fort',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("A sickly green-yellow vapor crawls across the ground.");
    // Logic: Kills 3HD or less; 1d4 Con damage to higher HD.
  }
};
