/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Homing Beacon
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 1, p.41
 * 
 * Logic:
 * - Requirement: A 'Homing Rune' must be placed on static ground/structure.
 * - Effect: Caster senses the direction and approximate distance to the rune.
 * - Distance Tiers: "a few miles", "a score of miles", "hundreds of miles".
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'homing_beacon',
  name: 'Homing Beacon',
  level: 1,
  school: 'divination',
  subschool: null,
  descriptors: ['navigation'],
  source: '& Magazine Issue 1, p.41',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 1
   * - Sorcerer: 1
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 segment',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'homing_pigeon_feather', 
      quantity: 1, 
      consumed: true,
      notes: 'A feather from a homing pigeon.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'self',
  duration: '1 hour/level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster) {
    const home = caster.getMeta('home_rune_location');
  
    if (!home) {
      return B.sayAt(caster, "<yellow>You have no anchored rune. Use the 'setbeacon' command while standing at your chosen home.</yellow>");
    }
    
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // Logic: Check if the player has a set 'home_rune_location'
    if (!caster.getMeta('home_rune_location')) {
      return B.sayAt(caster, "<yellow>You have no anchored rune to guide you back. You must first MARK a location.</yellow>");
    }

    B.sayAt(caster, `<cyan>You hold the pigeon feather aloft; it trembles in your fingers, pulling toward a distant point.</cyan>`);
    B.sayAtExcept(caster.room, `<cyan>${caster.name} holds a feather that seems to point toward the horizon with unnatural persistence.</cyan>`, [caster]);

    const beaconEffect = state.EffectFactory.create('homing_beacon_active', {
      duration: cl * 3600000, // 1 hour per level
    });

    caster.addEffect(beaconEffect);
  }
};
