/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/commune_with_nature.js
 */
'use strict';

module.exports = {
  id: 'commune_with_nature',
  name: 'Commune with Nature',
  level: 5,
  school: 'divination',
  descriptors: [],
  castingTime: '10 minutes',
  components: ['V', 'S'],
  range: 'personal',
  target: 'self',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You become one with the terrain, learning its secrets for miles.");
  }
};
