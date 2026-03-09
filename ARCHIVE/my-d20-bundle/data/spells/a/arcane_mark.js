/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Inscribes a personal rune or mark on an object or creature. 
 * The mark is permanent and unique to the caster.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arcane_mark',
  name: 'Arcane Mark',
  level: 0,
  school: 'universal',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 201',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 0
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'object or creature',
  area: null,
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Determine the Mark: Use player's set meta OR generate a default based on their name.
    const playerMark = caster.getMeta('arcane_mark_description');
    const markDescription = playerMark || `a glowing sigil of ${caster.name}`;
    
    // 2. Immediate Narrative Feedback
    caster.say(`<cyan>You trace your finger across the surface of ${target.name}. A trail of soft, pulsating light follows your touch, hardening into your personal mark: ${markDescription}.</cyan>`);
    
    target.room.broadcastExcept(caster, `<cyan>${caster.name} touches ${target.name} with a glowing fingertip, etching a permanent, shimmering rune into its surface.</cyan>`);

    // 3. Create and apply the permanent effect
    const effect = state.EffectFactory.create('arcane_mark_effect', {
      config: { 
        name: "Arcane Mark",
        duration: -1 // Permanent duration
      },
      state: {
        casterName: caster.name,
        casterId: caster.id,
        markDescription: markDescription
      }
    });

    target.addEffect(effect);
  }
};
