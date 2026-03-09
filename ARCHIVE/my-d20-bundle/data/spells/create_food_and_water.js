/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/create_food_and_water.js
 */
'use strict';

module.exports = {
  id: 'create_food_and_water',
  name: 'Create Food and Water',
  level: 3,
  school: 'conjuration',
  subschool: 'creation',
  castingTime: '10 minutes',
  components: ['V', 'S'],
  range: 'close',
  target: 'area',
  duration: '24 hours',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("Nutritious, if bland, sustenance manifests before you.");
    // Logic: Spawns 3 units of food and water per caster level.
  }
};
