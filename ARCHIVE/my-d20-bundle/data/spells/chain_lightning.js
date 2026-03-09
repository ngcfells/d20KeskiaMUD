/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/chain_lightning.js
 * PURPOSE: SRD - High-voltage arc hitting multiple targets.
 */

'use strict';

module.exports = {
  id: 'chain_lightning',
  name: 'Chain Lightning',
  level: 6,
  school: 'evocation',
  subschool: null,
  descriptors: ['electricity'],
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  materialComponents: [{ id: 'glass_rod', quantity: 1, consumed: false }],
  range: 'long',
  target: 'one primary target, plus one secondary/level',
  duration: 'instantaneous',
  savingThrow: 'ref',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const damage = state.Dice.roll(`${Math.min(caster.level, 20)}d6`);
    const finalDamage = ctx.savePassed ? Math.floor(damage / 2) : damage;
    
    target.damage(finalDamage, caster, 'electricity');
    caster.say("A massive arc of blue-white electricity leaps from your fingertips!");
    // Logic: Engine handles secondary arcs at half primary damage.
  }
};
