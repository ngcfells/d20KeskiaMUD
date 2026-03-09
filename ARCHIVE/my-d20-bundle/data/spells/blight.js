/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/blight.js
 * PURPOSE: SRD - Withering a plant or plant creature.
 */

'use strict';

module.exports = {
  id: 'blight',
  name: 'Blight',
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'touch',
  target: 'plant creature or plants',
  duration: 'instantaneous',
  savingThrow: 'fort',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const damage = ctx.savePassed ? state.Dice.roll(`${Math.min(caster.level, 15)}d6`) / 2 : state.Dice.roll(`${Math.min(caster.level, 15)}d6`);
    target.damage(damage, caster, 'necrotic');
    caster.say(`You draw the life force out of ${target.name}, leaving it withered.`);
  }
};
