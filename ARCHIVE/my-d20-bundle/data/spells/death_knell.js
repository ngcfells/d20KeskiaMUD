/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/death_knell.js
 */
'use strict';

module.exports = {
  id: 'death_knell',
  name: 'Death Knell',
  level: 2,
  school: 'necromancy',
  descriptors: ['death', 'evil'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'living creature with -1 or fewer HP',
  duration: 'instantaneous',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.die();
      caster.addEffect('death_knell_surge', { strBonus: 2, clBonus: 1 });
      caster.say(`You drain the final flicker of life from ${target.name} to bolster your own.`);
    }
  }
};
