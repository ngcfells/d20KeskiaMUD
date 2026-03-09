/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Opens stuck, barred, locked, held, or magically sealed doors.
 * It is a direct counter to Abjurations like Arcane Lock and Hold Portal.
 */

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'knock',
  name: 'Knock',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 246',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Greed Domain: 2
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V'], // Only Verbal: Loud and distinct.
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium', // 100 ft. + 10 ft./level
  target: 'object', // door, box, or chest
  area: 'up to 10 sq. ft./level',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    /**
     * Logic (3.5 SRD):
     * 1. Opens up to two means of closure (locks, bars, etc.).
     * 2. If Arcane Lock is present, it suppresses it for 10 minutes.
     * 3. Creates a loud knocking sound audible up to 300 feet.
     */
    
    // EMOTES: CASTING
    caster.say("<cyan>You speak a single, resonant word of command. A sharp, thunderous crack echoes from the mechanism of " + target.name + ".</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} utters a sharp, vibrating incantation. A loud, metallic 'CLANG' erupts from ${target.name}, as if struck by an invisible hammer.</cyan>`);

    // Engine: Check for Arcane Lock effect
    const arcaneLock = target.effects.getByType('arcane_lock_seal');
    if (arcaneLock) {
        // Suppression logic: Suspend for 10 minutes (600,000ms)
        arcaneLock.pause(600000);
        caster.say("<yellow>The shimmering blue sigils on " + target.name + " flicker and turn a dull grey, their power temporarily broken.</yellow>");
    }

    // Logic: Trigger the 'onKnockSpell' listener on the target object
    // This allows the object to handle unlocking its specific bits/bars.
    target.emit('onKnockSpell', { caster });
    
    // Noise logic for stealth/aggro systems
    caster.room.emit('loudNoise', { 
        source: target, 
        radius: 300, 
        intensity: 'high' 
    });

    if (this.emotes.success) {
      this.emotes.success(target);
    }
  },

  emotes: {
    success: (target) => {
      target.room.broadcast(`<white>With a heavy, internal groan of protesting gears, the pins within ${target.name} shift and click into an unlocked position.</white>`);
    }
  }
};
