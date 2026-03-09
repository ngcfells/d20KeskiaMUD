/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/continual_flame.js
 */
'use strict';

module.exports = {
  id: 'continual_flame',
  name: 'Continual Flame',
  level: 2,
  school: 'evocation',
  descriptors: ['light'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  range: 'touch',
  target: 'object touched',
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    target.setMetaData('emits_light', true);
    caster.say(`A heatless flame ignites upon ${target.name}.`);
  }
};
