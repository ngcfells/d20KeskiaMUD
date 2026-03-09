'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Determines whether a particular action will bring good or bad results 
 * in the immediate future (within 30 minutes).
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'augury',
  name: 'Augury',
  level: 2,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 minute',
  components: ['V', 'S', 'M', 'F'],
  
  materialComponents: [
    { id: 'incense', quantity: 1, minValue: 25, consumed: true }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
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
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 70% base chance + 1% per caster level (max 90%)
    const chance = Math.min(70 + (caster.level || 1), 90);
    const roll = state.Dice.roll('1d100').total;
    
    if (roll <= chance) {
      // In a MUD context, this usually hooks into upcoming room triggers or quest states
      caster.say("<cyan>You cast the tokens and watch the smoke rise. A cryptic omen regarding your next action forms in your mind.</cyan>");
      
      // Example Placeholder for Engine Integration
      // const omen = state.OmenManager.getForecast(caster);
      // caster.say(`<white>[Omen]: ${omen}</white>`);
    } else {
      caster.say("<grey>The tokens fall in a confusing jumble; the signs are unclear.</grey>");
    }

    target.room.broadcastExcept(caster, `${caster.name} stares intently at a scattering of tokens amidst a cloud of sweet-smelling incense.`);
  }
};
