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
  id: 'arc_of_lightning',
  name: 'Arc of Lightning',
  level: 1,                       // Sorcerer/Wizard 1
  school: 'evocation',
  subschool: null,
  descriptors: ['electricity'],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S'],

  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'medium',                // 100 ft. + 10 ft./level
  target: 'one primary target, then secondary targets',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'reflex',          // Reflex half damage
  spellResistance: true,          // Yes

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, primaryTarget, ctx) {
    /**
     * Logic (Spell Compendium pg. 15):
     * 1. Bolt hits primary target for 1d6 damage/level (max 5d6).
     * 2. Bolt arcs to a secondary target within 15 feet.
     * 3. Secondary target takes half damage (Reflex save for half of that).
     */
    const casterLevel = caster.getEffectiveCasterLevel();
    const diceCount = Math.min(casterLevel, 5);
    const primaryDamageRoll = state.dice.roll(`${diceCount}d6`);

    // --- Primary Target Damage ---
    if (primaryTarget.checkSpellResistance(caster, this.id)) {
      const primarySave = primaryTarget.rollSave('reflex', ctx.saveDC);
      let primaryFinalDamage = primaryDamageRoll.total;

      if (primarySave.success) primaryFinalDamage = Math.floor(primaryFinalDamage / 2);
      primaryTarget.applyDamage(primaryFinalDamage, 'electricity', { source: caster.id });
    }

    // --- Secondary Target Damage (Arc) ---
    const nearbyEnemies = state.getEntitiesInArea(primaryTarget.position, 15);
    // Find the next *nearest* valid enemy that is not the caster or primary target
    const secondaryTarget = nearbyEnemies.find(e => 
      e.id !== caster.id && e.id !== primaryTarget.id && e.isEnemyOf(caster)
    );

    if (secondaryTarget && secondaryTarget.checkSpellResistance(caster, this.id)) {
      const secondarySave = secondaryTarget.rollSave('reflex', ctx.saveDC);
      // Secondary damage is already half of the primary damage
      let secondaryDamage = Math.floor(primaryDamageRoll.total / 2);

      if (secondarySave.success) secondaryDamage = Math.floor(secondaryDamage / 2);
      secondaryTarget.applyDamage(secondaryDamage, 'electricity', { source: caster.id });
      
      state.visuals.spawnEffect('lightning_arc', primaryTarget.position, { end: secondaryTarget.position });
    }
  },

  onTick(state, caster, effect) {},

  onEnd(state, caster, effect) {}
};
