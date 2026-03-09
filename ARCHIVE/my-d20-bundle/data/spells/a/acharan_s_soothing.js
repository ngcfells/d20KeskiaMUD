/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acharan’s Soothing
 * Source: WotC | Wizard's Spell Compendium Vol 4, p.854
 * 
 * Logic:
 * - Effect: Calms the target, removing 'Shaken' or 'Rattled' conditions.
 * - Buff: Grants a +2 morale bonus vs. Fear for the duration.
 */
const { MIND } = require('../../lib/combat/damage-types');
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'acharans_soothing',
  name: 'Acharan’s Soothing',
  level: 1,
  school: 'abjuration',
  subschool: null,
  descriptors: [MIND],
  source: "Wizard's Spell Compendium Vol 4, p.854",

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Sha'ir: 1
   * - Bard: 1
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'piece_of_silk', quantity: 1, consumed: true, notes: 'A small scrap of white silk.' },
    { id: 'drop_of_sweet_oil', quantity: 1, consumed: true, notes: 'A single drop of perfumed sweet oil.' }
  ],

  range: 'touch',
  target: 'creature touched',
  duration: '1 hour/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    Broadcast.sayAt(caster, `<cyan>You rub the silk and oil between your fingers, touching ${target.name} with a calming grace.</cyan>`);
    
    // Remove Fear Conditions (Tiers 1 & 2)
    const fearConditions = ['rattled', 'shaken'];
    fearConditions.forEach(cond => {
        if (target.effects.hasEffect(cond)) {
            target.effects.remove(cond);
            Broadcast.sayAt(target, `<white>The grip of terror on your heart dissolves.</white>`);
        }
    });

    const soothingEffect = state.EffectFactory.create('soothed_mind', {
      duration: cl * 3600000
    });
    target.addEffect(soothingEffect);
  }
};
