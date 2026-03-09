/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/clone.js
 */
'use strict';

module.exports = {
  id: 'clone',
  name: 'Clone',
  level: 8,
  school: 'necromancy',
  descriptors: [],
  castingTime: '10 minutes',
  components: ['V', 'S', 'M', 'F'],
  range: 'touch',
  target: 'one clone grown from flesh',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You begin the long process of growing a biological inert duplicate.");
    // Logic: Creates a backup entity for the caster's soul upon death.
  }
};
