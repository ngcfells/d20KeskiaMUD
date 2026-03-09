/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Imbues the recipient's heart with a steady, divine pulse that 
 * rejects all forms of cowardice and magical terror.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'divine_heart',
  name: 'Divine Heart',
  level: 2,
  school: 'necromancy',
  subschool: null,
  descriptors: ['mind-affecting'], // Though it grants immunity to such
  source: 'Dread Codex | p. 15',

  /**
   * SPELL LISTS:
   * - Cleric: 2
   * - Paladin: 2
   * - Courage Domain: 2
   * - Rarity: Common (Standard among militant orders)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'living creature touched',
  area: null,
  duration: '10 min./level',
  savingThrow: 'none',
  spellResistance: true, // Harmless

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = (10 * casterLevel) * 60 * 1000;

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<cyan>You place your hand over ${target.name}'s heart and whisper a prayer of steadfast resolve. A golden warmth spreads from your palm.</cyan>`);
    
    target.say(`<yellow>A rhythmic, drumming heat radiates from your chest, washing away all doubt and leaving your spirit as unyielding as iron.</yellow>`);
    
    target.room.broadcastExcept([caster, target], `<yellow>${caster.name} touches ${target.name}'s chest; a soft, golden pulse emanates from the point of contact, synchronized with a steady heartbeat.</yellow>`);

    const effect = state.EffectFactory.create('divine_heart_effect', {
      config: { 
        name: "Divine Heart",
        duration: durationMs 
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    fearBlocked: (target) => {
      target.say(`<cyan>A wave of terror washes over you, but it shatters against the divine rhythm of your heart like water against stone.</cyan>`);
    }
  }
};
