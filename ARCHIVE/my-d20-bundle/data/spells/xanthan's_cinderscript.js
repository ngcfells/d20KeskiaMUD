/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/xanthan's_cinderscript.js
 * PURPOSE: Xanthan's way of "sharing" knowledge by burning it into the target.
 */
'use strict';

module.exports = {
  id: 'xanthans_cinderscript',
  name: "Xanthan's Cinder-Script",
  level: 4,
  school: 'evocation',
  descriptors: ['fire'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'creature',
  duration: 'instantaneous',
  savingThrow: 'ref',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const damage = state.Dice.roll('7d6');
    target.damage(damage, caster, 'fire');
    caster.say(`Xanthan laughs as flaming runes sear ${target.name}'s flesh!`);
    // Logic: If the target has scrolls/books, they must save or they catch fire.
  }
};
