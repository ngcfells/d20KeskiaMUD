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
  id: 'arachnophobia',
  name: 'Arachnophobia',
  level: 3,                       // Wizard 3
  school: 'illusion',
  subschool: 'phantasm',          // Only the target sees the spiders
  descriptors: ['fear', 'mind-affecting'],

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
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one creature/level',   // Within a 10-ft. diameter sphere
  area: '10-ft. diameter sphere',
  duration: '1 round/level',
  savingThrow: 'will',            // Will negates
  spellResistance: true,          // Yes

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
  onCast(state, caster, targets, ctx) {
    /**
     * Logic:
     * 1. Creates a terrifying phantasm of thousands of spiders.
     * 2. Targets must succeed on a Will save or become Frightened.
     * 3. Phantasmal spiders deal 1d6 psychic damage per round to those failing the save.
     */
    const validTargets = Array.isArray(targets) ? targets : [targets];

    validTargets.forEach(unit => {
      const saveResult = unit.rollSave('will', ctx.saveDC);
      
      if (!saveResult.success) {
        const effect = {
          id: 'arachnophobia_active',
          source: 'arachnophobia',
          damagePerRound: '1d6',
          status: 'frightened'
        };

        unit.addEffect(effect);
        unit.addStatus('frightened', { duration: '1 round/level' });
        
        state.notify(unit, "Thousands of illusory spiders swarm over your skin!");
      }
    });
  },

  onTick(state, caster, effect) {
    /**
     * Engine Hook:
     * Affected targets take psychic damage at the start of their turn.
     */
    const target = state.getEntity(effect.targetId);
    if (target && target.hasEffect('arachnophobia_active')) {
      const damage = state.dice.roll(effect.damagePerRound).total;
      target.applyDamage(damage, 'psychic', { source: caster.id });
    }
  },

  onEnd(state, caster, effect) {
    // Cleanup status and effects
  }
};
