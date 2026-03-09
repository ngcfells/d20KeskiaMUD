/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cloak_of_chaos.js
 */
'use strict';

module.exports = {
  id: 'cloak_of_chaos',
  name: 'Cloak of Chaos',
  level: 8,
  school: 'abjuration',
  descriptors: ['chaotic'],
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  range: '20 ft.',
  target: 'one creature/level',
  duration: '1 round/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    target.addEffect('chaos_cloak', { acBonus: 4, resistanceBonus: 4 });
    caster.say(`A flickering, multicolored field of entropy shields ${target.name}.`);
  }
};
