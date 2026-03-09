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
  id: 'aquatic_escape',
  name: 'Aquatic Escape',
  level: 1,                       // Druid 1
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'swift',           // Swift action casting
  components: ['V', 'S'],         // Verbal, Somatic

  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 round/level',      // (D) Dismissible
  savingThrow: 'none',
  spellResistance: false,

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
     * Logic (Spell Compendium pg. 15):
     * 1. Caster takes the form of a Diminutive fish.
     * 2. Uses the statistics of a Toad (MM 282) with modifications.
     * 3. Gains: Aquatic subtype, Swim speed 30 ft (replaces land speed).
     * 4. Skills: Listen +4, Spot +4, Swim +13 (replaces toad skills).
     * 5. Special: Fish adds Dex modifier (not Str) to Swim checks.
     */
    const effect = {
      id: 'aquatic_escape_form',
      source: 'aquatic_escape',
      formSize: 'diminutive',
      subtypes: ['aquatic'],
      movement: { swim: 30, land: 0 },
      skillBonuses: { listen: 4, spot: 4, swim: 13 }
    };

    caster.addEffect(effect);
    
    // Engine hook to force the "fish" form's movement and skill logic
    caster.addHook('calculateSwimCheck', (checkData) => {
      checkData.useAttribute('dexterity');
      checkData.addRacialBonus(8); // Standard bonus for having a swim speed
    });
  },

  onTick(state, caster, effect) {
    // Check if the caster has left the water; fish cannot breathe air
    if (caster.environment !== 'water') {
      caster.applyCondition('suffocating');
    }
  },

  onEnd(state, caster, effect) {
    const target = state.getEntity(effect.targetId);
    if (target) {
      target.removeHook('calculateSwimCheck');
      target.removeCondition('suffocating');
    }
  }
};
