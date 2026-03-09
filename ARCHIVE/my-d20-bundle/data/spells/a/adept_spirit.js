/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Adept Spirit
 * Source: WotC | Spell Compendium p.7
 * 
 * Logic:
 * - +1 Insight bonus to Caster Level (CL).
 * - +2 Insight bonus on Will saves.
 * - +1 Insight bonus on Intelligence-based checks.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'adept_spirit',
  name: 'Adept Spirit',
  level: 2,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'WotC | Spell Compendium p.7',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Cleric: 2
   * - Knowledge Domain: 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'fine_incense', 
      quantity: 13, // ~13 pinches @ 0.8gp = 10.4gp
      minValue: 0.8, 
      consumed: true,
      notes: 'Fine, scholarly incense to bridge the gap to the spirit world.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  duration: '1 min/level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    const adeptBuff = state.EffectFactory.create('adept_spirit_buff', {
      duration: cl * 60000,
      state: { casterLevelBonus: 1 }
    });

    caster.addEffect(adeptBuff);

    // EMOTES
    B.sayAt(caster, "<bold><white>You inhale the sweet, heavy incense. A faint, shimmering outline of an ancient master sage overlaps your form!</white></bold>");
    B.sayAtExcept(caster.room, `<white>A ghostly, scholarly figure appears momentarily behind ${caster.name}, mirroring their every movement.</white>`, [caster]);
  }
};
