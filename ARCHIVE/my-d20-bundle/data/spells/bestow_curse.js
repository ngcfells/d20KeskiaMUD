/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/bestow_curse.js
 * PURPOSE: SRD - Permanent debuffing of a foe.
 */

'use strict';

module.exports = {
  id: 'bestow_curse',
  name: 'Bestow Curse',
  level: 3, // Cleric 3, Sor/Wiz 4
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'creature',
  duration: 'permanent',
  savingThrow: 'will',
  spellResistance: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      // Choice of: -6 to an ability, -4 to attacks/saves/checks, or 50% chance to lose turn.
      target.addEffect('cursed', { abilityPenalty: -6 });
      caster.say(`You lay a dark hand upon ${target.name}, weaving a permanent blight into their soul.`);
    }
  }
};
