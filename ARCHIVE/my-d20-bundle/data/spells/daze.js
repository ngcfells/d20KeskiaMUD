/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/daze.js
 */
'use strict';

module.exports = {
  id: 'daze',
  name: 'Daze',
  level: 0,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
   materialComponents: [{ id: 'pinch_of_wool', quantity: 1, consumed: true }],
  range: 'close',
  target: 'one humanoid creature of 4 HD or less',
  duration: '1 round',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('dazed');
      caster.say(`${target.name} stares blankly, momentarily clouded.`);
    }
  }
};
