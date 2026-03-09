/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/color_spray.js
 */
'use strict';

module.exports = {
  id: 'color_spray',
  name: 'Color Spray',
  level: 1,
  school: 'illusion',
  subschool: 'pattern',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'colored_sand', quantity: 1, consumed: true }],
  range: 'close',
  target: 'cone-shaped burst',
  duration: 'instantaneous',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('stunned_blinded_unconscious');
      caster.say("A clashing rainbow of colors erupts from your hand!");
    }
  }
};
