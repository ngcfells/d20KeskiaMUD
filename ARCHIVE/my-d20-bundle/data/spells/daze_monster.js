/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/daze_monster.js
 */
'use strict';

module.exports = {
  id: 'daze_monster',
  name: 'Daze Monster',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  range: 'medium',
  target: 'one creature of 6 HD or less',
  duration: '1 round',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('dazed');
      caster.say(`You cloud ${target.name}'s mind with overwhelming arcane pressure.`);
    }
  }
};
