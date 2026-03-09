'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Removes the burden of misdeeds and restores class features to those
 * who have lost them through alignment shifts or code violations.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'atonement',
  name: 'Atonement',
  level: 5,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 hour',
  components: ['V', 'S', 'M', 'F', 'DF', 'XP'],
  
  materialComponents: [
    { id: 'incense_atonement', quantity: 1, minValue: 500, consumed: true }
  ],
  
  // Note: XP cost is situational based on the severity of the transgression.
  xpCost: 500, 

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'creature touched',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: true,

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
    caster.say(`You intercede for ${target.name}, seeking to wash away their spiritual burdens.`);
    
    // Logic: Restore lost class features
    if (target.getMeta('class_features_lost')) {
      target.setMeta('class_features_lost', false);
      target.say("<cyan>A profound sense of peace washes over you. Your connection to your path is restored.</cyan>");
    }

    // Logic: Alignment correction
    const targetAlignment = target.getMeta('alignment');
    const casterAlignment = caster.getMeta('alignment');
    
    if (targetAlignment !== casterAlignment) {
      target.setMeta('alignment', casterAlignment);
      target.say(`<white>Your soul realigns with the frequency of ${casterAlignment}.</white>`);
    }

    target.room.broadcastExcept([caster, target], `<white>A soft, celestial light descends upon ${target.name} as their spiritual burdens are lifted.</white>`);
  }
};
