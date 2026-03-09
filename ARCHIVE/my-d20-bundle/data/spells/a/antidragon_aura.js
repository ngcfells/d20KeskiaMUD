/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * All spells in my-d20-bundle must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'antidragon_aura',
  name: 'Antidragon Aura',
  level: 3,                       // Cleric 3, Sorcerer/Wizard 3
  school: 'abjuration',
  subschool: null,
  descriptors: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'dragon_scale',
      quantity: 1,
      consumed: true,
      notes: 'A dragon scale.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'touch',
  target: 'willing creature touched',
  area: null,
  duration: '1 min./level',
  savingThrow: 'will',            // Will negates (harmless)
  spellResistance: true,          // Yes (harmless)

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    /**
     * Logic (Spell Compendium pg. 14):
     * 1. Grants a +2 luck bonus to Armor Class.
     * 2. Grants a +2 luck bonus on saving throws.
     * 3. These bonuses increase to +4 against attacks and effects 
     *    originating from dragons.
     */
    const effect = {
      id: 'antidragon_aura_active',
      source: 'antidragon_aura',
      baseBonus: 2,
      draconicBonus: 4,
      bonusType: 'luck'
    };

    target.addEffect(effect);

    // Engine hook to apply luck bonuses
    target.addHook('onCalculateAC', (acData, attacker) => {
      const isDragon = attacker && attacker.type === 'dragon';
      const bonus = isDragon ? effect.draconicBonus : effect.baseBonus;
      acData.addBonus(bonus, effect.bonusType);
    });

    target.addHook('onCalculateSave', (saveData, source) => {
      const isDragonSource = source && source.type === 'dragon';
      const bonus = isDragonSource ? effect.draconicBonus : effect.baseBonus;
      saveData.addBonus(bonus, effect.bonusType);
    });
  },

  onTick(state, caster, effect) {},

  onEnd(state, caster, effect) {
    const target = state.getEntity(effect.targetId);
    if (target) {
      target.removeHook('onCalculateAC');
      target.removeHook('onCalculateSave');
    }
  }
};
