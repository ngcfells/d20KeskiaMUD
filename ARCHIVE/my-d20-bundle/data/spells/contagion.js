/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/contagion.js
 */
'use strict';

module.exports = {
  id: 'contagion',
  name: 'Contagion',
  level: 3,
  school: 'necromancy',
  descriptors: ['evil'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'living creature',
  duration: 'instantaneous',
  savingThrow: 'fort',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('diseased');
      caster.say(`You infect ${target.name} with a wasting disease.`);
    }
  }
};
