/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/create_undead.js
 */
'use strict';

module.exports = {
  id: 'create_undead',
  name: 'Create Undead',
  level: 6,
  school: 'necromancy',
  descriptors: ['evil'],
  castingTime: '1 hour',
  components: ['V', 'S', 'M'],
  range: 'close',
  target: 'one corpse',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("Dark energy knits bone and flesh, raising a Ghoul or Ghast.");
  }
};
