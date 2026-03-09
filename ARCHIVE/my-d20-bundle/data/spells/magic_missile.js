'use strict';

module.exports = {
  id: 'magic_missile',
  name: 'Magic Missile',
  level: 1,
  school: 'evocation',
  descriptors: ['force'],

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'creature',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const missiles = Math.min(5, Math.floor((cl + 1) / 2));
    const damagePer = 2 + 1; // 1d4+1 simplified as static for now

    const totalDamage = missiles * damagePer;

    target.damage(totalDamage, caster, 'force');
    caster.say(`<yellow>Your magic missiles slam into ${target.name}!</yellow>`);
    target.say(`<red>You are struck by ${missiles} glowing darts of force!</red>`);
  }
};
