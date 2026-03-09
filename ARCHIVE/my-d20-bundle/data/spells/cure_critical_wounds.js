/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cure_critical_wounds.js
 */
'use strict';

module.exports = {
  id: 'cure_critical_wounds',
  name: 'Cure Critical Wounds',
  level: 4,
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
    const heal = state.Dice.roll('4d8') + Math.min(caster.level, 20);
    target.heal(heal);
    caster.say(`White light mends ${target.name}'s most grievous injuries.`);
  }
};
