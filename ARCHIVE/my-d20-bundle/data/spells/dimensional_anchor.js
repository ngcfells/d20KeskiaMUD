/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/dimensional_anchor.js
 */
'use strict';

module.exports = {
  id: 'dimensional_anchor',
  name: 'Dimensional Anchor',
  level: 4,
  school: 'abjuration',
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'creature',
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say(`A shimmering green ray fixes ${target.name} to the current plane.`);
    target.addEffect('dimensional_anchor');
  }
};
