/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/death_ward.js
 */
'use strict';

module.exports = {
  id: 'death_ward',
  name: 'Death Ward',
  level: 4,
  school: 'abjuration',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'touch',
  target: 'creature touched',
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    target.addEffect('death_ward');
    caster.say(`${target.name} is warded against all death effects, energy drain, and instant death.`);
  }
};
