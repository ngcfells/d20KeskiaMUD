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
  id: 'anticold_sphere',
  name: 'Anticold Sphere',
  level: 5,                       // Sorcerer/Wizard 5
  school: 'abjuration',
  subschool: null,
  descriptors: ['cold'],          // The sphere abjures cold effects

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
  range: '0 ft.',                 // Emanates from caster
  target: 'creatures and objects in area',
  area: '10-ft.-radius emanation centered on you',
  duration: '1 min./level',      // (D)
  savingThrow: 'none',            // Affects objects/area
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
     * Logic (Spell Compendium pg. 14):
     * 1. Creates an invisible sphere of abjuration.
     * 2. Provides total immunity to all ambient and magical cold effects originating outside the sphere.
     * 3. Cold effects originating *inside* the sphere function normally.
     * 4. Extinguishes normal fires in the area.
     * 5. Protects against cold damage from contact (e.g., Chill Metal).
     */
    const effect = {
      id: 'anticold_sphere_active',
      source: 'anticold_sphere',
      radius: 10,
      type: 'abjuration_field',
      origin: caster.position
    };

    state.addAreaEffect(effect);

    // Engine hook to grant cold immunity within the sphere
    state.addHook('onIncomingDamage', (damageData) => {
      const dist = state.utils.getDistance(damageData.target.position, caster.position);
      
      if (dist <= effect.radius && damageData.type === 'cold') {
        // If the source is external to the sphere
        if (!state.isWithinArea(damageData.source.position, effect.origin, effect.radius)) {
          damageData.setImmune(true);
        }
      }
    });

    // Engine hook to manage environmental cold sources
    state.addHook('onEnvironmentCheck', (envData) => {
        const dist = state.utils.getDistance(envData.location, caster.position);
        if (dist <= effect.radius && envData.type === 'cold') {
            envData.setNegated(true);
        }
    });
  },

  onTick(state, caster, effect) {
    // Sphere moves with the caster
    effect.origin = caster.position;
  },

  onEnd(state, caster, effect) {
    state.removeAreaEffect(effect.id);
    state.removeHook('onIncomingDamage');
    state.removeHook('onEnvironmentCheck');
  }
};
