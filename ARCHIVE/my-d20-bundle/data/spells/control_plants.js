/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/control_plants.js
 */
'use strict';

module.exports = {
  id: 'control_plants',
  name: 'Control Plants',
  level: 8,
  school: 'transmutation',
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'plant creatures in area',
  duration: '1 min./level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('controlled');
      caster.say("You seize absolute control over the surrounding plant life.");
    }
  }
};
