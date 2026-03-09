/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/discern_location.js
 */
'use strict';

module.exports = {
  id: 'discern_location',
  name: 'Discern Location',
  level: 8,
  school: 'divination',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'unlimited',
  target: 'one creature or object',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say(`You instantly know the exact location of ${target.name}.`);
  }
};
