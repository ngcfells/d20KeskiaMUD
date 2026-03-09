/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/confusion.js
 */
'use strict';

module.exports = {
  id: 'confusion',
  name: 'Confusion',
  level: 4,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  materialComponents: [{ id: 'three_nut_shells', quantity: 1, consumed: true }],
  range: 'medium',
  target: 'area',
  area: '15-ft. radius burst',
  duration: '1 round/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('confused');
      caster.say(`${target.name} begins to babble incoherently.`);
    }
  }
};
