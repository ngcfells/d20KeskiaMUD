/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/chaos_hammer.js
 * PURPOSE: SRD - Punishment for lawful creatures.
 */

'use strict';

module.exports = {
  id: 'chaos_hammer',
  name: 'Chaos Hammer',
  level: 4,
  school: 'evocation',
  subschool: null,
  descriptors: ['chaotic'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'area',
  area: '20-ft.-radius burst',
  duration: 'instantaneous (1d6 rounds)',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // 5d8 damage to Lawful (max 10d8); 1/2 damage to others.
    const damage = state.Dice.roll(`${Math.min(Math.floor(caster.level / 2), 5)}d8`);
    if (target.alignment.includes('lawful')) {
      target.damage(damage, caster, 'chaos');
      if (!ctx.savePassed) target.addEffect('slowed', { duration: '1d6 rounds' });
      caster.say("A multicolored explosion of raw entropy strikes the orderly!");
    } else {
      target.damage(Math.floor(damage / 2), caster, 'chaos');
    }
  }
};
