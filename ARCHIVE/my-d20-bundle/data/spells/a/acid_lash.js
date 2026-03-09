/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Lash
 * Source: WotC | Wizard's Spell Compendium (2E) | 3.5 Conversion
 * 
 * Logic:
 * - Creates a 7-ft long whip of acid in the caster's hand.
 * - Attack: Melee Touch Attack (using the lash).
 * - Damage: 1d6 + 1/level (max +10) Acid damage.
 * - Effect: On a hit, target must check vs 'Acidic' (liquids) for 1 round.
 */

const { ACID } = require('../../lib/combat/damage-types');
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'acid_lash',
  name: 'Acid Lash',
  level: 2,
  school: 'evocation',
  subschool: null,
  descriptors: [ACID],
  source: "Wizard's Spell Compendium (2E)",

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Blackguard: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'brimstone_sulfur', quantity: 1, consumed: true },
    { id: 'stagnant_rainwater', quantity: 1, consumed: true }
  ],

  range: '0 ft.',
  target: 'self',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    caster.say("<bold><green>You snap your wrist, and a crackling, seven-foot lash of bubbling green acid extends from your palm.</green></bold>");
    caster.room.emitExcept(caster, `<bold><green>${caster.name} conjures a translucent, hissing whip of emerald acid.</green></bold>`);

    // This spell grants the caster an effect that allows them to "attack" with the lash
    const lashEffect = state.EffectFactory.create('acid_lash_active', {
      duration: cl * 6000,
      state: { casterLevel: cl }
    });
    
    caster.addEffect(lashEffect);
  }
};
