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
  id: 'arrow_storm',
  name: 'Arrow Storm',
  level: 3,                       // Ranger 3
  school: 'transmutation',
  subschool: null,
  descriptors: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'swift',           // Swift action
  components: ['V'],              // Verbal only

  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'personal',
  target: 'self',
  area: 'one range increment',
  duration: '1 round',            // Instantaneous flurry within 1 round
  savingThrow: 'none',
  spellResistance: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    /**
     * Logic (Spell Compendium pg. 16):
     * 1. Instead of normal attacks, you make one ranged attack against 
     *    every foe within one range increment of your bow.
     * 2. You must be using a bow (not a crossbow).
     * 3. This is a full-round action performed in the same round 
     *    the swift spell is cast.
     * 4. Maximum number of attacks is equal to your Character Level.
     */
    
    // Check for bow requirement
    if (!caster.isEquipped('bow')) {
      return state.notify(caster, "Arrow Storm requires a bow.");
    }

    const effect = {
      id: 'arrow_storm_active',
      source: 'arrow_storm',
      maxTargets: caster.level,
      rangeIncrement: caster.getWeaponRange('bow')
    };

    caster.addEffect(effect);

    // Engine Hook: Replace the next 'full_attack' action
    caster.addHook('onActionStart', (action) => {
      if (action.type === 'full_attack') {
        action.cancel(); // Prevent normal iterative attacks

        const foes = state.getEntitiesInArea(caster.position, effect.rangeIncrement)
          .filter(e => e.isEnemyOf(caster))
          .slice(0, effect.maxTargets);

        foes.forEach(foe => {
          caster.makeRangedAttack(foe, { 
            weapon: 'bow',
            isExtraAttack: true 
          });
        });

        // The spell effect is spent after the flurry
        caster.removeEffect(effect.id);
      }
    });
  },

  onTick(state, caster, effect) {
    // If the round ends without a full attack, the magic dissipates
    if (state.isEndOfRound()) {
      caster.removeEffect(effect.id);
    }
  },

  onEnd(state, caster, effect) {
    caster.removeHook('onActionStart');
  }
};
