/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cure_light_wounds.js
 */
'use strict';

module.exports = {
  id: 'cure_light_wounds',
  name: 'Cure Light Wounds',
  level: 1,
  school: 'conjuration',
  subschool: 'healing',
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'creature',
  duration: 'instantaneous',
  savingThrow: 'will (half/dmg)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const heal = state.Dice.roll('1d8') + Math.min(caster.level, 5);
    target.heal(heal);
    caster.say(`A soothing touch closes ${target.name}'s minor cuts.`);
  }
};
