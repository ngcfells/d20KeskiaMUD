/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/chill_metal.js
 */
'use strict';

module.exports = {
  id: 'chill_metal',
  name: 'Chill Metal',
  level: 2,
  school: 'transmutation',
  descriptors: ['cold'],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'close',
  target: 'metal equipment of one creature',
  duration: '7 rounds',
  savingThrow: 'will (object)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say(`The metal on ${target.name} begins to frost over with lethal cold.`);
    target.addEffect('chilled_metal_progression'); // Logic: progressive cold damage
  }
};
