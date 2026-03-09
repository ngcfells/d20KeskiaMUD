/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/deep_slumber.js
 */
'use strict';

module.exports = {
  id: 'deep_slumber',
  name: 'Deep Slumber',
  level: 3,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
   materialComponents: [{ id: 'rose_petals', quantity: 1, consumed: true }],
  range: 'medium',
  target: 'creatures in area',
  area: '10-ft. radius spread',
  duration: '1 min./level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('unconscious');
      caster.say(`A magical exhaustion washes over ${target.name}, forcing them into a deep sleep.`);
    }
  }
};
