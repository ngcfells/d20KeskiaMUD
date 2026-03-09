/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cure_moderate_wounds.js
 */
'use strict';

module.exports = {
  id: 'cure_moderate_wounds',
  name: 'Cure Moderate Wounds',
  level: 2,
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
    const heal = state.Dice.roll('2d8') + Math.min(caster.level, 10);
    target.heal(heal);
    caster.say(`A pulse of positive energy knits ${target.name}'s moderate wounds.`);
  }
};
