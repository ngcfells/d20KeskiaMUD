/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/chill_touch.js
 */
'use strict';

module.exports = {
  id: 'chill_touch',
  name: 'Chill Touch',
  level: 1,
  school: 'necromancy',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'creature(s) touched',
  duration: 'instantaneous',
  savingThrow: 'fort/will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    target.damage(state.Dice.roll('1d6'), caster, 'negative');
    if (!ctx.savePassed) target.damage(1, caster, 'strength');
    caster.say("Your hand glows with blue energy as you sap the target's vitality.");
  }
};
