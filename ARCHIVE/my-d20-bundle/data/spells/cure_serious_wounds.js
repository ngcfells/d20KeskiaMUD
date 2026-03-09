/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cure_serious_wounds.js
 */
'use strict';

module.exports = {
  id: 'cure_serious_wounds',
  name: 'Cure Serious Wounds',
  level: 3,
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
    const heal = state.Dice.roll('3d8') + Math.min(caster.level, 15);
    target.heal(heal);
    caster.say(`Radiant light flows from your hand, sealing deep gashes on ${target.name}.`);
  }
};
