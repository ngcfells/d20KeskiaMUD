'use strict';

module.exports = {
  id: 'fireball',
  name: 'Fireball',
  level: 3,
  school: 'evocation',
  descriptors: ['fire'],

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  range: 'long',
  area: '20-ft-radius burst',
  duration: 'instantaneous',
  savingThrow: 'ref',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const dice = Math.min(10, cl); // max 10d6
    const avgDamage = dice * 3.5; // average of d6

    const damage = ctx.savePassed ? Math.floor(avgDamage / 2) : Math.floor(avgDamage);

    target.damage(damage, caster, 'fire');

    caster.say(`<yellow>Your fireball explodes around ${target.name}!</yellow>`);
    target.say(`<red>You are engulfed in flames!</red>`);
  }
};
