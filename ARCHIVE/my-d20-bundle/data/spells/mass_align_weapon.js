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
  id: 'mass_align_weapon',
  name: 'Mass Align Weapon',
  level: 3,                       // Cleric 3
  school: 'transmutation',
  subschool: null,
  descriptors: ['good', 'evil', 'lawful', 'chaotic'], // Matches chosen alignment

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],

  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one weapon/level, no two of which can be more than 30 ft. apart',
  area: null,
  duration: '1 min./level',
  savingThrow: 'will',            // Will negates (harmless, object)
  spellResistance: true,          // Yes (harmless, object)

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
     * Logic (Spell Compendium pg. 9):
     * 1. This functions like Align Weapon, but affects multiple weapons.
     * 2. Choose one alignment: Good, Evil, Lawful, or Chaotic.
     * 3. Weapons bypass DR of that specific type.
     */
    const alignmentOptions = ['good', 'evil', 'lawful', 'chaotic'];
    const choice = ctx.getChoice('alignment_type', alignmentOptions);

    // Casting restriction: Cannot choose an alignment opposed to your own
    if (caster.alignment.isOpposedTo(choice)) {
      return state.notify(caster, "Ethos mismatch: Cannot align weapons against your own alignment.");
    }

    const validTargets = Array.isArray(targets) ? targets.slice(0, caster.level) : [targets];

    validTargets.forEach(weapon => {
      // Cannot align natural weapons (use Align Fang for those)
      if (weapon.isNatural) return;

      const effect = {
        id: `mass_align_weapon_${choice}`,
        source: 'mass_align_weapon',
        alignmentType: choice
      };

      weapon.addEffect(effect);

      // Hook to bypass DR
      weapon.addHook('onCalculateDamage', (damageData) => {
        damageData.addDescriptor(choice);
      });
    });
  },

  onTick(state, caster, effect) {},

  onEnd(state, caster, effect) {
    // Hooks are cleaned up by the engine when the effect expires
  }
};
